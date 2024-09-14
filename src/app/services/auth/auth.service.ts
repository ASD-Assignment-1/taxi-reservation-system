import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NON_SECURE, getEndpoint } from 'src/app/utility/constants/end-point';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl = `${getEndpoint(NON_SECURE, 'auth')}`;
  
  constructor(private readonly httpClient: HttpClient) { }

}
