import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {
    email: string = '';
    password: string = '';
    errorMessage: string = '';

    constructor(private authService: AuthService, private router: Router) {}

    async signup() {
      try {
        await this.authService.signUp(this.email, this.password);
        this.router.navigate(['/dashboard']);
      } catch (error) {
        this.errorMessage = 'Erreur lors de l\'inscription. Veuillez réessayer.';
        console.error('Erreur d\'inscription:', error);
      }
    }
}
