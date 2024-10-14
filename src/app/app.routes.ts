import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { GalleryProjetComponent } from './pages/gallery-projet/gallery-projet.component';
import { DetailsComponent } from './pages/details/details.component';
import { TableComponent } from './pages/table/table.component';
import { LoginComponent } from './pages/login/login.component';
import { SignupComponent } from './pages/signup/signup.component';
import { authGuard } from './services/auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [authGuard] },
  { path: 'gallery-projet', component: GalleryProjetComponent, canActivate: [authGuard] },
  { path: 'table', component: TableComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'details/:id', component: DetailsComponent }
];

