import { Injectable } from '@angular/core';
import { Firestore, collection, collectionData, deleteDoc, doc, getDocs, increment, query, setDoc, updateDoc, where } from '@angular/fire/firestore';
import { Projet } from '../models/projet.model';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class GalleryService {

  constructor(private firestore: Firestore) { }

   // Sauvegarder ou mettre à jour une photo
   async saveProjet(projet: Projet): Promise<void> {
    const projetsCollection = collection(this.firestore, 'projet');
    if (projet.id) {
      const photoRef = doc(projetsCollection, projet.id);
      return await setDoc(photoRef, projet, { merge: true });
    } else {
      return await setDoc(doc(projetsCollection), projet);
    }
  }
  // Récupérer toutes les photos
  getProjet(): Observable<Projet[]> {
    return collectionData(collection(this.firestore, 'projet'), { idField: 'id' }) as Observable<Projet[]>;
  }
  // Supprimer une photo
  async deleteProjet(projetId: string): Promise<void> {
    const projetRef = doc(this.firestore, 'projet', projetId);
    return await deleteDoc(projetRef);
  }

     // Aimer une photo
     async likeProjet(projet: Projet): Promise<void> {
      if (projet.id) {
        const projetRef = doc(this.firestore, 'projet', projet.id);
        return await updateDoc(projetRef, {
          likes: increment(1)
        });
      } else {
        console.error('Cannot like a projet without ID');
      }
    }

      // Récupérer uniquement les projets visibles
  async getVisibleProjets(): Promise<Projet[]> {
    const projetsCollection = collection(this.firestore, 'projet');
    const visibleProjetsQuery = query(projetsCollection, where('visible', '==', true));
    const visibleProjetsSnapshot = await getDocs(visibleProjetsQuery);
    const visibleProjetsList = visibleProjetsSnapshot.docs.map(doc => {
      return { id: doc.id, ...doc.data() } as Projet;
    });
    return visibleProjetsList;
  }

   // Mettre à jour la visibilité d'un projet

   async updateProjetVisibility(projetId: string, visible: boolean): Promise<void> {
    const projetDoc = doc(this.firestore, 'projet', projetId);
    await updateDoc(projetDoc, { visible });
  }
}
