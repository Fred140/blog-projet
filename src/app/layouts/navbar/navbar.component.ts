import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { User, getAuth } from '@angular/fire/auth';


@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent{
      isLoggedIn!: false;


      constructor(public auth: AuthService, private router: Router ) {
        this.auth.isLoggedIn().subscribe(isLoggedInStatus => {
          this.isLoggedIn = isLoggedInStatus as false;
        });
      }

    ngOnInit(): void {

    }

    navigateToLogin() {
      this.router.navigate(['/login']);
    }


    logout() {
      this.auth.signOut();
      this.router.navigate(['login']);
    }
}
