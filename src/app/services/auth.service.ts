import { Injectable } from '@angular/core';
import { getAuth, Auth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, User } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { onAuthStateChanged } from '@angular/fire/auth';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/compat/auth';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
   private user: User | null = null;
   private userSubject: BehaviorSubject<User | null> = new BehaviorSubject<User | null>(null);
   user$: Observable<User | null> = this.userSubject.asObservable();
   private loggedIn = new BehaviorSubject<boolean>(false);



  constructor(private auth: Auth, private router: Router) {
    onAuthStateChanged(this.auth, (user) => {
      this.loggedIn.next(!!user);
      if (user) {
        localStorage.setItem('user', JSON.stringify(user));

      } else {
        localStorage.removeItem('user');
      }
    });
  }

  signUp(email: string, password: string): Promise<any> {
    return createUserWithEmailAndPassword(this.auth, email, password).then( res => {
      alert('Registration avec succès')
    })
  }

  signIn(email: string, password: string): Promise<any> {
    return signInWithEmailAndPassword(this.auth, email, password);
  }

 // signOut(): void {
   // signOut(this.auth).then(() => {
   //   localStorage.removeItem('user');
  //    this.router.navigate(['login']);
 // }), (err: { message: any; }) => {
  //    alert(err.message);
  // };

  //}

  getUser() {
    return this.user;
  }

  isLoggedIn() {
    return this.loggedIn.asObservable();
  }
  signOut() {
    return signOut(this.auth);
  }
}
