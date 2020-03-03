import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

// Models
import { AuthSession } from './AuthSession';
import { UrlService } from 'src/app/services/url.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient, private urlService: UrlService) { }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  createTokenAuthentication(email, password): Observable<AuthSession> {
    const authDTO = {
      email: email,
      password: password,
    }

    return this.http.post<AuthSession>(this.urlService.getDefaultUrl().concat('/login'), authDTO);
  }
}
