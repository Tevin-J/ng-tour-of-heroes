import {Component, OnInit} from '@angular/core';
import {IHero} from '../hero';
import {ActivatedRoute} from '@angular/router';
import {HeroService} from '../hero.service';
import {Location} from '@angular/common';

/*помечаем декоратором @Component данный класс, это говорит что данный класс - компонента*/
@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css']
})
export class HeroDetailComponent implements OnInit {

  hero: IHero;
  /*ActivatedRoute содержит информацию о роуте для этой компоненты, HeroService
  предоставляет свои данные, Location сервис ангуляра для взаимодействия с браузером*/
  constructor(private route: ActivatedRoute,
              private heroService: HeroService,
              private location: Location) { }

  ngOnInit(): void {
    this.getHero();
  }

  getHero(): void {
    /*получаем id из урла в браузере*/
    const id = +this.route.snapshot.paramMap.get('id');
    this.heroService.getHero(id)
      .subscribe(hero => this.hero = hero);
  }

  /*метод, который обращается к браузеру и возвращает по клику на
  кнопку урл обратно на предыдущий*/
  goBack(): void {
    this.location.back();
  }

  save(): void {
    this.heroService.updateHero(this.hero)
      .subscribe(() => this.goBack());
  }

}
