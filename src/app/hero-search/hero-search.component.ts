import { Component, OnInit } from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {debounceTime, distinctUntilChanged, switchMap} from 'rxjs/operators';

import {IHero} from '../hero';
import {HeroService} from '../hero.service';

@Component({
  selector: 'app-hero-search',
  templateUrl: './hero-search.component.html',
  styleUrls: ['./hero-search.component.css']
})
export class HeroSearchComponent implements OnInit {

  heroes$: Observable<Array<IHero>>;

  /*searchTerms - свойство RxJS субъекта.Subject одновременно является источником
  наблюдаемых значений и самим Observable. Можно подписаться ну субъект как на
  любой Observable. можно помещать значения в Observable вызывая метод next(value)*/
  private searchTerms = new Subject<string>()

  constructor(private heroService: HeroService) { }

  search(term: string): void {
    this.searchTerms.next(term);
  }

  ngOnInit(): void {
    this.heroes$ = this.searchTerms.pipe(
      /*задержка*/
      debounceTime(300),
      /*игнор новой строки для поиска, если старая такая же*/
      distinctUntilChanged(),
      /*переключиться к новому поиску observable каждый раз когда меняется строка для поиска*/
      switchMap((term: string) => this.heroService.searchHeroes(term))
    );
  }

}
