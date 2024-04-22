import { Routes } from '@angular/router';
import { MainPageComponent } from './components/main-page/main-page.component';
import { FormComponent } from './components/form/form.component';
import { PlayersComponent } from './components/players/players.component';

export const routes: Routes = [ { path: '', redirectTo: 'main-page', pathMatch: 'full' },
                                { path: 'main-page', component: MainPageComponent },
                                { path: 'form', component: FormComponent },
                                { path: 'players', component: PlayersComponent },
                                { path: '**', redirectTo: 'main-page' }
                              ];