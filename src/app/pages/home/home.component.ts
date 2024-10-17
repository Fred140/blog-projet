import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { Observable } from 'rxjs';
import { Projet } from '../../models/projet.model';
import { Firestore } from '@angular/fire/firestore';
import { GalleryService } from '../../services/gallery.service';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {MatGridListModule} from '@angular/material/grid-list';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, MatButtonModule, MatCardModule, CommonModule, FormsModule, MatGridListModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',

})
export class HomeComponent {
  projetData!: Observable<Projet[]>;
  selectedImage: Projet | null = null;
  visible?: true;
  galleryService: any;
  visibleProjets: Projet[] = [];



  constructor(private router: Router, private GalleryService: GalleryService, private firestore: Firestore) { }

  ngOnInit() {
    // Charger les projets depuis firestore via le service
    this.loadVisibleProjets();
  }

  onLike(projet: Projet) {
    this.galleryService.likeProjet(projet);
  }
  navigateToDetails(id: string) {
    this.router.navigate(['/details:id', id]);
  }

  // Charger uniquement les projets visibles
  async loadVisibleProjets(): Promise<void> {
    try {
      this.visibleProjets = await this.GalleryService.getVisibleProjets();
    } catch (error) {
      console.error('Erreur lors de la récupération des projets', error);
    }
   }
  }
