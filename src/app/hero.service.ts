import { Injectable } from '@angular/core';
import {HEROES} from './mock-heroes';
import {IHero} from './hero';
import {MessageService} from './message.service';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {catchError, map, tap} from 'rxjs/operators';

/*помечаем данный класс декоратором Injectable, который
говорит о том, что этот класс-сервис. настраиваем его метаданные.
providedIn - для кого мы хотим предоставить доступ к этому сервису*/
@Injectable({
  providedIn: 'root'
})

/*экспортируем метод для получения данных якобы с сервера*/
export class HeroService {

  /*заинжектили сервис MessageService в другой сервис HeroService,
  который уже заинжектили в компоненту HeroesComponent*/
  constructor(
    private messageService: MessageService,
    private http: HttpClient) { }

  private heroesUrl = 'api/heroes';

  /*настраиваем headers*/
  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };

  /*получение данных с сервера с помощью HttpClient. с помощью catchError()
  перехватываем Observable, который завершился с ошибкой. Внутри мы можем
  обработать ошибку с помощью handleError(). tap() - оператор RxJS, который
  наблюдает за значениями observable, делает с ними что-то и передает их*/
  getHeroes(): Observable<Array<IHero>> {
    return this.http.get<Array<IHero>>(this.heroesUrl)
      .pipe(
        tap(_ => this.log('fetched heroes')),
        catchError(this.handleError<Array<IHero>>('getHeroes', []))
      );
  }

  getHero(id: number): Observable<IHero> {
    const url = `${this.heroesUrl}/${id}`;
    return this.http.get<IHero>(url).pipe(
      tap(_ => this.log(`fetched hero id=${id}`)),
      catchError(this.handleError<IHero>(`getHero id=${id}`))
    );
  }

  /*HttpClient.put() принимает 3 параметра - url, данные для обновления, опции*/
  updateHero(hero: IHero): Observable<any> {
    return this.http.put(this.heroesUrl, hero, this.httpOptions).pipe(
      tap(_ => this.log(`updated hero id=${hero.id}`)),
      catchError(this.handleError<any>('updateHero'))
    );
  }

  addHero(hero: IHero): Observable<IHero> {
    return this.http.post<IHero>(this.heroesUrl, hero, this.httpOptions).pipe(
      tap((newHero: IHero) => this.log(`added hero w/ id=${newHero.id}`)),
      catchError(this.handleError<IHero>('addHero'))
    );
  }

  deleteHero(hero: IHero | number): Observable<IHero> {
    const id = typeof hero === 'number' ? hero : hero.id;
    const url = `${this.heroesUrl}/${id}`;

    return this.http.delete<IHero>(url, this.httpOptions).pipe(
      tap(_ => this.log(`deleted hero id=${id}`)),
      catchError(this.handleError<IHero>('deleteHero'))
    );
  }

  searchHeroes(term: string): Observable<Array<IHero>> {
    if (!term.trim()) {
      /*если пустота в поисковой строке - вернем пустой массив героев*/
      return of([]);
    }
    return this.http.get<Array<IHero>>(`${this.heroesUrl}/?name=${term}`).pipe(
      tap(x => x.length ?
      this.log(`found heroes matching '${term}'`) :
      this.log(`no heroes matching '${term}'`)),
      catchError(this.handleError<Array<IHero>>('searchHeroes', []))
    );
  }

  /*обработка http запросов которые зафейлятся. позволит
  приложению продолжить работу. operation - имя операции которая
  зафейлилась, result - значение которое вернется для Observable*/
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);

      this.log(`${operation} failed:  ${error.message}`);

      /*позволяем приложению продолжить работу, вернув пустой результат. поскольку
      каждый метод сервиса возвращает различный вид результата Observable, handleError()
      принимает параметр типа, чтоб он мог вернуть безопасное значение в качестве типа,
      ожидаемого приложением.*/
      return of(result as T);
    };
  }

  private log(message: string) {
    this.messageService.add(`HeroService: ${message}`);
  }
}
