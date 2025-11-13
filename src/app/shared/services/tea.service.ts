import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

export interface Tea {
  id: number;
  title: string;
  price: number;
  description: string;
  image: string;
}

@Injectable({
  providedIn: 'root'
})
export class TeaService {
  private apiUrl = 'https://testologia.ru/tea';

  constructor(private http: HttpClient) { }

  getTeas(search?: string): Observable<Tea[]> {
    let params = new HttpParams();
    if (search) {
      params = params.set('search', search);
    }

    return this.http.get<Tea[]>(this.apiUrl, { params }).pipe(
      catchError(error => {
        console.error('API Error:', error);
        return of(this.getDefaultTeas());
      })
    );
  }

  getTeaById(id: number): Observable<Tea> {
    return this.http.get<Tea>(`${this.apiUrl}?id=${id}`).pipe(
      catchError(error => {
        console.error('API Error:', error);
        const defaultTeas = this.getDefaultTeas();
        const tea = defaultTeas.find(t => t.id === id) || defaultTeas[0];
        return of(tea);
      })
    );
  }

  private getDefaultTeas(): Tea[] {
    return [
      {
        id: 1,
        title: 'Детокс чай лайм',
        price: 450,
        description: 'Великолепный чай внесет в вашу жизнь яркие краски и вкус расслабления. Идеален для вечернего релакса.',
        image: 'assets/images/image1.png'
      },
      {
        id: 2,
        title: 'Ягодный чай',
        price: 520,
        description: 'Нотки ягод позволят вам расслабиться и насладиться великолепием этого чая. Насыщенный вкус и аромат.',
        image: 'assets/images/image2.png'
      },
      {
        id: 3,
        title: 'Цветочный чай',
        price: 480,
        description: 'Душистые цветы создают невероятный аромат и наполняют вас энергией. Прекрасный выбор для утра.',
        image: 'assets/images/image3.png'
      },
      {
        id: 4,
        title: 'Очищающий чай',
        price: 390,
        description: 'Бесподобный чай для получения утреннего заряда бодрости. Освежает и тонизирует организм.',
        image: 'assets/images/image4.png'
      },
      {
        id: 5,
        title: 'Кислый чай',
        price: 510,
        description: 'Кислый чай для настоящих ценителей кислинки во время чаепития. Уникальное сочетание вкусов.',
        image: 'assets/images/image5.png'
      },
      {
        id: 6,
        title: 'Лимонная мята',
        price: 470,
        description: 'Смесь лимона с мятой сделает ваш день самым лучшим. Освежающий и бодрящий напиток.',
        image: 'assets/images/image6.png'
      }
    ];
  }
}
