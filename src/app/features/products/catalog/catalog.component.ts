import { Component, OnInit } from '@angular/core';
import { TeaService, Tea } from '../../../shared/services/tea.service';

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
      next: (teas: Tea[]) => {
        this.teas = teas;
        this.loading = false;
      },
      error: (error: any) => {
        this.error = true;
        this.loading = false;
        this.teas = this.getDefaultTeas();
      }
    });
  }

  private getDefaultTeas(): Tea[] {
    return [
      {
        id: 1,
        title: 'Детокс чай лайм',
        price: 450,
        description: 'Великолепный чай внесет в вашу жизнь яркие краски и вкус расслабления',
        image: 'assets/images/image1.png'
      },
      {
        id: 2,
        title: 'Ягодный чай',
        price: 520,
        description: 'Нотки ягод позволят вам расслабиться и насладиться великолепием этого чая',
        image: 'assets/images/image2.png'
      },
      {
        id: 3,
        title: 'Цветочный чай',
        price: 480,
        description: 'Душистые цветы создают невероятный аромат и наполняют вас энергией',
        image: 'assets/images/image3.png'
      },
      {
        id: 4,
        title: 'Очищающий чай',
        price: 390,
        description: 'Бесподобный чай для получения утреннего заряда бодрости',
        image: 'assets/images/image4.png'
      },
      {
        id: 5,
        title: 'Кислый чай',
        price: 510,
        description: 'Кислый чай для настоящих ценителей кислинки во время чаепития',
        image: 'assets/images/image5.png'
      },
      {
        id: 6,
        title: 'Лимонная мята',
        price: 470,
        description: 'Смесь лимона с мятой сделает ваш день самым лучшим',
        image: 'assets/images/image6.png'
      }
    ];
  }
}
