import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, GuardResult, MaybeAsync, Router, RouterStateSnapshot } from "@angular/router";
import { AuthService } from "./auth.service";



@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
    constructor(private Auth: AuthService, private router: Router) {}

    canActivate(): boolean {
      if (!this.Auth.isLoggedIn()) {
        this.router.navigate(['login']);
        return false;
      }
      return true;
    }

}
