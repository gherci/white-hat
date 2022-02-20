import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GameListComponent } from './components/game-list/game-list.component';

const routes: Routes = [
  { path: 'top-games', component: GameListComponent, data: {id: 'top'} },
  { path: 'new-games', component: GameListComponent, data: {id: 'new'} },
  { path: 'slots', component: GameListComponent, data: {id: 'slots'} },
  { path: 'jackpots', component: GameListComponent, data: {id: 'jackpots'} },
  { path: 'live', component: GameListComponent, data: {id: 'live'} },
  { path: 'blackjack', component: GameListComponent, data: {id: 'blackjack'} },
  { path: 'roulette', component: GameListComponent, data: {id: 'roulette'} },
  { path: 'table', component: GameListComponent, data: {id: 'table'} },
  { path: 'poker', component: GameListComponent, data: {id: 'poker'} },
  { path: 'other', component: GameListComponent, data: {id: 'other'} },
  { path: '', redirectTo: 'top-games', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
