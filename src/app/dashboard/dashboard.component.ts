import { Component, OnInit } from '@angular/core';
import {HeroService} from '../hero.service';
import {IHero} from '../hero';

/*указали что этот класс - компонента*/
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  heroes: Array<IHero> = [];

  /*подключаем сервис HeroService, чтоб получить из него данные героев*/
  constructor(private heroService: HeroService) { }

  /*при монтировании компоненты делаем вызываем метод getHeroes*/
  ngOnInit() {
    this.getHeroes();
  }

  /*этот метод обращается к сервису и его методу по запросу героев,
  подписываемся на получение героев с сервиса и берем 2-5 элементы
  для отображения их в качестве topHeroes*/
  getHeroes(): void {
    this.heroService.getHeroes()
      .subscribe(heroes => this.heroes = heroes.slice(1, 5));
  }
}
