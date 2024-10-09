import { Component } from '@angular/core';
import { Firestore, collection, collectionData, doc, increment, updateDoc } from '@angular/fire/firestore';
import { Router, RouterLink } from '@angular/router';
import { Observable, map } from 'rxjs';
import { Projet } from '../../models/projet.model';
import { GalleryService } from '../../services/gallery.service';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-gallery-projet',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './gallery-projet.component.html',
  styleUrl: './gallery-projet.component.css'
})
export class GalleryProjetComponent {
  projetData!: Observable<Projet[]>;
  selectedImage: Projet | null = null;


  constructor(private firestore: Firestore, private router: Router, private galleryService: GalleryService) { }

  ngOnInit() {
    this.getData();
  }

  getData() {
    const collectionInstance = collection(this.firestore, 'projet');
    this.projetData = collectionData(collectionInstance, { idField: 'id' }).pipe(
      map((dataArray: Projet[]) => dataArray.map(data => ({
        id: data['id'],
        titre: data['titre'],
        description: data['description'],
        imageUrl: data['imageUrl'],
        likes: data['likes']
      }) as Projet))
    );
  }

  onLike(projet: Projet) {
    this.galleryService.likeProjet(projet);
  }

  navigateToDetails(id: string) {
    this.router.navigate(['/details', id]);
  }

}
