import { Injectable } from '@angular/core';
import { Auth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, User } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { onAuthStateChanged } from '@angular/fire/auth';



@Injectable({
  providedIn: 'root'
})
export class AuthService {
   private user: User | null = null;


  constructor(private auth: Auth, private router: Router) {
    onAuthStateChanged(this.auth, (user) => {
      this.user = user;
      if (user) {
        localStorage.setItem('user', JSON.stringify(user));
      } else {
        localStorage.removeItem('user');
      }
    });
  }

  signUp(email: string, password: string): Promise<any> {
    return createUserWithEmailAndPassword(this.auth, email, password);
  }

  signIn(email: string, password: string): Promise<any> {
    return signInWithEmailAndPassword(this.auth, email, password);
  }

  signOut(): void {
    signOut(this.auth);
    localStorage.removeItem('user');
    this.router.navigate(['login']);
  }

  getUser() {
    return this.user;
  }

  isLoggedIn(): boolean {
    return !!this.user;
  }
}
