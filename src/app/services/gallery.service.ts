import { Injectable } from '@angular/core';
import { Firestore, collection, collectionData, deleteDoc, doc, getDocs, increment, query, setDoc, updateDoc, where } from '@angular/fire/firestore';
import { Projet } from '../models/projet.model';
import { Observable } from 'rxjs';
import { Auth} from '@angular/fire/auth';



@Injectable({
  providedIn: 'root'
})
export class GalleryService {
 // private db;
  //private projetsCollection;

  constructor(private firestore: Firestore, private auth: Auth) { }

   // Sauvegarder ou mettre à jour un projet
   async saveProjet(projet: Projet): Promise<void> {
    const projetsCollection = collection(this.firestore, 'projet');
    if (projet.id) {
      const photoRef = doc(projetsCollection, projet.id);
      return await setDoc(photoRef, projet, { merge: true });
    } else {
      return await setDoc(doc(projetsCollection), projet);
    }
  }
  // Récupérer tous les projets
  getProjet(): Observable<Projet[]> {
    return collectionData(collection(this.firestore, 'projet'), { idField: 'id' }) as Observable<Projet[]>;
 }

  // Supprimer un projet
  async deleteProjet(projetId: string): Promise<void> {
    const projetRef = doc(this.firestore, 'projet', projetId);
    return await deleteDoc(projetRef);
  }

     // Aimer un projet
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

  updateProjet(id: string, data: Partial<Projet>) {
    const projetDoc = doc(this.firestore, `projets/$(id)`);
    return updateDoc(projetDoc, data);
  }
}
