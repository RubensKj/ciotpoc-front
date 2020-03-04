import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  BASE_HEADER_AUTH = 'Authorization';

  constructor() { }

  getBaseHeaderAuth() {
    return this.BASE_HEADER_AUTH;
  }

  getAuthorization() {
    return localStorage.getItem(this.BASE_HEADER_AUTH);
  }

  setAuthorizationInLocalStorage(token: string) {
    return localStorage.setItem(this.BASE_HEADER_AUTH, token);
  }

  removeAuthorizationFromLocalStorage() {
    localStorage.removeItem(this.BASE_HEADER_AUTH);
  }

  notContainsInLocalStorage(): boolean {
    return localStorage.getItem(this.BASE_HEADER_AUTH) === undefined || localStorage.getItem(this.BASE_HEADER_AUTH) === null || localStorage.getItem(this.BASE_HEADER_AUTH) === '';
  }
}
