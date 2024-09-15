import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ILogin } from 'src/app/interface/ILogin';
import { NON_SECURE, getEndpoint } from 'src/app/utility/constants/end-point';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseUrl = `${getEndpoint(NON_SECURE)}`;

  constructor(private readonly httpClient: HttpClient) {}

  userLogin(data: ILogin): Observable<any> {
    return this.httpClient.post<any>(this.baseUrl + 'user/login/', {
      data,
    });
  }

  driverLogin(data: ILogin): Observable<any> {
    return this.httpClient.post<any>(this.baseUrl + 'driver/login/', {
      data,
    });
  }
}
