import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { TeaService, Tea } from '../../services/tea.service';
import { Subscription, timer } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
  showPopup = false;
  featuredTeas: Tea[] = [];
  private popupSubscription?: Subscription;

  constructor(
    private router: Router,
    private teaService: TeaService
  ) {}

  ngOnInit() {
    this.popupSubscription = timer(10000).subscribe(() => {
      this.showPopup = true;
    });

    this.teaService.getTeas().subscribe({
      next: (teas) => {
        this.featuredTeas = teas.slice(0, 6);
      },
      error: (error) => {
        console.error('Error loading teas:', error);
        this.featuredTeas = this.getDefaultTeas();
      }
    });
  }

  closePopup() {
    this.showPopup = false;
  }

  navigateToCatalog() {
    this.router.navigate(['/catalog']);
    this.closePopup();
  }

  ngOnDestroy() {
    if (this.popupSubscription) {
      this.popupSubscription.unsubscribe();
    }
  }

  private getDefaultTeas() {
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
