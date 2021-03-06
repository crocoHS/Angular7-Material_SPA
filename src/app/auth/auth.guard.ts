import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Auth } from '../../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate  {
  constructor(private auth:Auth, private router:Router){}

  canActivate(next: ActivatedRouteSnapshot ,state: RouterStateSnapshot): boolean {
    return this.checkLogedInState();
  }

  checkLogedInState(): boolean {
    if(this.auth.isLoggedIn) { return true; }

    this.router.navigate(['/user/login']);
    return false;
  }
}
