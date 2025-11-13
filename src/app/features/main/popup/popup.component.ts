import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.scss']
})
export class PopupComponent {
  @Output() close = new EventEmitter<void>();
  @Output() viewCatalog = new EventEmitter<void>();

  onClose() {
    this.close.emit();
  }

  onViewCatalog() {
    this.viewCatalog.emit();
  }
}
