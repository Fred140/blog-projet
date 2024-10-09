import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { GalleryProjetComponent } from './pages/gallery-projet/gallery-projet.component';
import { DetailsComponent } from './pages/details/details.component';
import { TableComponent } from './pages/table/table.component';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'gallery-projet', component: GalleryProjetComponent },
  { path: 'table', component: TableComponent },
  { path: 'details/:id', component: DetailsComponent }
];

