import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { OrderService, OrderData } from '../../shared/services/order.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {
  orderForm: FormGroup;
  submitting = false;
  orderSuccess = false;
  orderError = false;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private orderService: OrderService
  ) {
    this.orderForm = this.createForm();
  }

  ngOnInit() {
    const product = this.route.snapshot.queryParamMap.get('product');
    if (product) {
      this.orderForm.patchValue({ product });
    }
  }

  createForm(): FormGroup {
    return this.fb.group({
      name: ['', [Validators.required, Validators.pattern(/^[a-zA-Zа-яА-ЯёЁ\s]+$/)]],
      last_name: ['', [Validators.required, Validators.pattern(/^[a-zA-Zа-яА-ЯёЁ\s]+$/)]],
      phone: ['', [Validators.required, this.phoneValidator]],
      country: ['', Validators.required],
      zip: [''],
      product: ['', Validators.required],
      address: ['', [Validators.required, this.addressValidator]],
      comment: ['']
    });
  }

  phoneValidator(control: any) {
    const value = control.value || '';
    if (!value) return null;

    const digitsOnly = value.replace(/[^\d]/g, '');
    const hasPlus = value.startsWith('+');

    if (hasPlus && !/^\+[0-9]+$/.test(value)) {
      return { invalidPhone: true };
    }
    if (!hasPlus && !/^[0-9]+$/.test(value)) {
      return { invalidPhone: true };
    }

    if (digitsOnly.length !== 11) {
      return { invalidPhone: true };
    }

    return null;
  }

  addressValidator(control: any) {
    const value = control.value || '';
    if (!value) return null;

    if (!/^[a-zA-Zа-яА-ЯёЁ0-9\s\-\/]+$/.test(value)) {
      return { invalidAddress: true };
    }
    return null;
  }

  isFieldInvalid(fieldName: string): boolean {
    const field = this.orderForm.get(fieldName);
    return !!(field && field.invalid && (field.dirty || field.touched));
  }

  onSubmit() {
    Object.keys(this.orderForm.controls).forEach(key => {
      const control = this.orderForm.get(key);
      control?.markAsTouched();
    });

    if (this.orderForm.valid) {
      this.submitting = true;
      this.orderError = false;

      this.orderService.createOrder(this.orderForm.value).subscribe({
        next: (response) => {
          this.submitting = false;
          if (response.success === 1) {
            this.orderSuccess = true;
          } else {
            this.orderError = true;
          }
        },
        error: (error) => {
          console.error('Order error:', error);
          this.submitting = false;
          this.orderError = true;
        }
      });
    }
  }
}
