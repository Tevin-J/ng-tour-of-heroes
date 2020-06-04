import { NgModule } from '@angular/core';
import {HeroesComponent} from '../heroes/heroes.component';

/*импортируем RouterModule и Routes чтоб приложение имело функционал роутинга*/
import {RouterModule, Routes} from '@angular/router';
import {DashboardComponent} from '../dashboard/dashboard.component';
import {HeroDetailComponent} from '../hero-detail/hero-detail.component';

/*делаем настройки routes. Routes показывает роутеру что
отображать на экране, когда изменится url*/
const routes: Routes = [
  {path: 'heroes', component: HeroesComponent},
  {path: 'dashboard', component: DashboardComponent},
  {path: '', redirectTo: '/dashboard', pathMatch: 'full'},
  {path: 'detail/:id', component: HeroDetailComponent},
]

/*метаданные этого модуля инициализируют роутер и начинают прослушку урла в браузере*/
@NgModule({
  declarations: [],
  /*метод forRoot() предоставляет сервис провайдера и директивы необходимые
  для роутинга, и выполняет начальную навигацию на основе текущего урла*/
  imports: [RouterModule.forRoot(routes)],
  /*экспортируем RouterModule, чтоб он был доступен во всем
  приложении, предоставляет доступ к RouterOutlet*/
  exports: [RouterModule]
})
export class AppRoutingModule { }
