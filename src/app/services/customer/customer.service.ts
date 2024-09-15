import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IResponse } from 'src/app/interface/IResponse';
import { IUserRegister } from 'src/app/interface/IUserRegister';
import { NON_SECURE, getEndpoint } from 'src/app/utility/constants/end-point';

@Injectable()
export class CustomerService {
  private baseUrl = `${getEndpoint(NON_SECURE)}`;

  constructor(private readonly httpClient: HttpClient) {}

  customerRegister(data: IUserRegister): Observable<IResponse> {
    return this.httpClient.post<IResponse>(this.baseUrl + '/user/register', {
      ...data,
      role: 'USER',
    });
  }
}
