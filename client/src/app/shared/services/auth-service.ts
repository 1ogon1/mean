import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {tap} from "rxjs/operators";

import {User} from "../interfaces";

@Injectable({
  providedIn: "root"
})
export class AuthService {
  baseUrl: string = '/api/auth/';
  private token: string = null;

  constructor(private httpClient: HttpClient) {
  }

  login(user: User): Observable<{ token: string }> {
    return this.httpClient.post<{ token: string }>(this.baseUrl + 'login', user)
      .pipe(tap(({token}) => {
        localStorage.setItem('auth-token', token);
        this.setToken(token);
      }));
  }

  setToken(token: string) {
    this.token = token;
  }

  getToken(): string {
    return this.token;
  }

  isAuthenticated(): boolean {
    return !!this.token;
  }

  logOut() {
    this.setToken(null);
    localStorage.clear();
  }

  register(user: User): Observable<User> {
    return this.httpClient.post<User>(this.baseUrl + 'register', user);
  }
}
