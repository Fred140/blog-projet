import { Component, inject, OnInit, ViewChild } from '@angular/core';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { GalleryService } from '../../services/gallery.service';
import { Projet } from '../../models/projet.model';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import { Location } from '@angular/common';




@Component({
  selector: 'app-table',
  standalone: true,
  imports: [MatTableModule, MatInputModule, MatFormFieldModule, MatSlideToggleModule, MatPaginatorModule],
  templateUrl: './table.component.html',
  styleUrl: './table.component.css'
})
export class TableComponent  implements OnInit {
  displayedColumns: string[] = ['createdAt', 'titre', 'likes', 'visible'];
  dataSource = new MatTableDataSource<Projet>();
  projets: Projet[] = [];
  location = inject(Location);


  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  createdAt = new Date();
  data: unknown;
  Firestore: any;

  constructor(private galleryservice: GalleryService) { }

  ngOnInit(): void {
  this.galleryservice.getProjet().subscribe((data => {
    this.dataSource.data = data;
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }));
}

async loadProjets(): Promise<void> {
  try {
    this.data = await this.galleryservice.getProjet();
  } catch (error) {
    console.error('Erreur lors de la récupération des projets', error);
  }
}

applyFilter(event: Event) {
  const filterValue = (event.target as HTMLInputElement).value;
  this.dataSource.filter = filterValue.trim().toLowerCase();

  if (this.dataSource.paginator) {
    this.dataSource.paginator.firstPage();
  }
}

_updateChangeSubscription(projetId: string, showOnHomepage: boolean): Promise<void>{
  return this.Firestore.collection('projet').doc(projetId).update({ showOnHomepage });
}

 // Méthode appelée lors du changement de l'état du toggle
 async toggleVisibility(projet: Projet): Promise<void> {
  try {
    const newVisibility = !projet.visible;
    await this.galleryservice.updateProjetVisibility(projet.id as string, newVisibility);
    projet.visible = newVisibility; // Mise à jour locale après succés
  } catch (error) {
    console.error('Erreur lors de la mise à jour', error);
  }
 }

 back() {
  this.location.back()
 }

}
