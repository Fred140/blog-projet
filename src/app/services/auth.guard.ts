import { inject } from '@angular/core';
import { AuthService } from './auth.service';
import { CanActivateFn, Router } from '@angular/router';
import { map } from 'rxjs';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router  = inject(Router);

  return authService.isLoggedIn().pipe( map(user => {
    if (user) {
      return true;
    } else {
      router.navigate(['/login']);
      return false;
    }
  })
  );
  };
