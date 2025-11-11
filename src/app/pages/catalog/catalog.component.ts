import { Component, OnInit } from '@angular/core';
import { TeaService, Tea } from '../../services/tea.service';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.scss']
})
export class CatalogComponent implements OnInit {
  teas: Tea[] = [];
  loading = false;
  error = false;

  constructor(private teaService: TeaService) {}

  ngOnInit() {
    this.loadTeas();
  }

  loadTeas() {
    this.loading = true;
    this.error = false;

    this.teaService.getTeas().subscribe({
      next: (teas) => {
        this.teas = teas;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading teas:', error);
        this.error = true;
        this.loading = false;
      }
    });
  }
}
