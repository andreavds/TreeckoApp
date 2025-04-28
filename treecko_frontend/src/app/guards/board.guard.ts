import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class BoardGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(
    _route: ActivatedRouteSnapshot,
    _state: RouterStateSnapshot
  ): boolean | UrlTree {
    let navigationState = this.router.getCurrentNavigation()?.extras.state;
    if (!navigationState) {
      navigationState = window.history.state;
    }
    console.log('Guard navigation state:', navigationState);
    if (navigationState && navigationState['boardName']) {
      return true;
    }

    return this.router.parseUrl('/');
  }
}