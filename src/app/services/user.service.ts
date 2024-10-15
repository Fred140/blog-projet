import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { addDoc, collection, getDocs, getFirestore, query, where } from '@angular/fire/firestore';
import { getAuth } from '@angular/fire/auth';
import { initializeApp } from '@firebase/app';
import { environment } from '../../environments/environment.development';




@Injectable({
  providedIn: 'root'
})
export class UserService {
  private db;
  private auth;

  constructor(private authService: AuthService) {
     // Initialiser Firebase App et Firestore
     const app = initializeApp(environment.firebase);
     this.db = getFirestore(app);
     this.auth = getAuth(app);
   }

   // Récupérer les projets de l'utilisateur connecté
   async getProjetsByUser(): Promise<any[]> {
    const user = this.auth.currentUser; // Récupérer l'utilisateur actuellement connecté
    if(user) {
      const projetsCollection = collection(this.db, 'projet'); // collection 'projet'
      const q = query(projetsCollection, where('userId', '==', user.uid)); // Filtrer par l'UID de l'utilisateur
      const querySnapshot = await getDocs(q); // Exécuter la requête

      const projets = querySnapshot.docs.map(doc => doc.data()); // Récupérer les données du projet
      return projets;
    } else {
      return [];
    }
   }

   // Ajouter un projet pour l'utilisateur connecté
   async addProjet(projet: any) {
    const user = this.auth.currentUser;
    if(user) {
      projet.userId = user.uid; // Ajouter l'UID de l'utilisateur au projet
      const projetsCollection = collection(this.db, 'projet');
      await addDoc(projetsCollection, projet); // Ajouter le projet à la collection 'projet'
    }
   }
}
