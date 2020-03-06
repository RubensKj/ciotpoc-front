import { Injectable } from '@angular/core';

import { environment } from 'src/environments/environment.prod';
// import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UrlService {

  baseUrl = environment.baseUrlAPI;

  constructor() { }

  getDefaultUrl(): String {
    return this.baseUrl;
  }
}
