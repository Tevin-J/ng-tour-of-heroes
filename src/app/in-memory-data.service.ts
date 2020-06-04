import { Injectable } from '@angular/core';
import {InMemoryDbService} from 'angular-in-memory-web-api';
import {IHero} from './hero';

@Injectable({
  providedIn: 'root'
})
export class InMemoryDataService implements InMemoryDbService {

  createDb() {
    const heroes = [
      {id: 11, name: 'Vasya'},
      {id: 12, name: 'Petya'},
      {id: 13, name: 'Slava'},
      {id: 14, name: 'Misha'},
      {id: 15, name: 'Zhenya'},
      {id: 16, name: 'Dima'},
      {id: 17, name: 'Tolya'},
      {id: 18, name: 'Kolya'},
      {id: 19, name: 'Styopa'},
      {id: 20, name: 'Igor'}
    ];
    return {heroes};
  }
  /*метод генерации id. если массив героев пустой, то присваиваем id 11,
  иначе на 1 больше чем id последнего элемента в массиве*/
  genId(heroes: Array<IHero>): number {
    return heroes.length > 0 ? Math.max(...heroes.map(hero => hero.id)) + 1 : 11;
  }
}
