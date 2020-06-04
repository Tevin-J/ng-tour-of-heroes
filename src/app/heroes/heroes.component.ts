import { Component, OnInit } from '@angular/core';

import {IHero} from '../hero';
import {HeroService} from '../hero.service';

/*указываем что этот класс - компонента, настраиваем как называется
ее тег, откуда брать стили и с каким html-шаблоном связать*/
@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
/*экспортируем в html-шаблон данный класс с его методами и параметрами*/
export class HeroesComponent implements OnInit {

  heroes: Array<IHero>;

  /*в конструкторе получаем инстанс сервиса, из которого хотим забрать данные*/
  constructor(private heroService: HeroService) { }

  /*метод по записи в свойство компоненты данных из сервиса. поскольку у нас
  данные прихотят якобы с сервера, вызов getHeroes() возвращает Observable<Array<IHero>>,
  на который надо подписаться и после того как данные придут, уже записывать
  в какое-то свойство класса*/
  getHeroes(): void {
    this.heroService.getHeroes()
      .subscribe(heroes => this.heroes = heroes);
  }

  add(name: string): void {
    name = name.trim();
    if (!name) { return; }
    this.heroService.addHero({name} as IHero)
      .subscribe(hero => {
        this.heroes.push(hero);
      });
  }

  delete(hero: IHero): void {
    this.heroes = this.heroes.filter(h => h !== hero);
    this.heroService.deleteHero(hero).subscribe();
  }

  /*указываем что делаем запрос на сервис за данными в момент когда
  компонента вмонтирована с помощью хука жизненного цикла ngOnInit*/
  ngOnInit() {
    this.getHeroes();
  }

}
