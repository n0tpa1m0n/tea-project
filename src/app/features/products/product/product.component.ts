import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TeaService, Tea } from '../../../shared/services/tea.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  tea?: Tea;
  loading = true;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private teaService: TeaService
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.loadProduct(+id);
    } else {
      this.loading = false;
    }
  }

  loadProduct(id: number) {
    this.teaService.getTeaById(id).subscribe({
      next: (tea) => {
        this.tea = tea;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading product:', error);
        this.loading = false;
      }
    });
  }

  buyProduct() {
    if (this.tea) {
      this.router.navigate(['/order'], {
        queryParams: { product: this.tea.title }
      });
    }
  }
}
