import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DriverStatus } from 'src/app/enums/DriverStatus.enum';
import { IAddRate } from 'src/app/interface/IAddRate';
import { IDriverRegister } from 'src/app/interface/IDriverRegister';
import { IResponse } from 'src/app/interface/IResponse';
import { NON_SECURE, getEndpoint } from 'src/app/utility/constants/end-point';

@Injectable()
export class DriverService {
  private baseUrl = `${getEndpoint(NON_SECURE)}`;

  constructor(private readonly httpClient: HttpClient) {}

  driverRegister(data: IDriverRegister): Observable<IResponse> {
    return this.httpClient.post<IResponse>(this.baseUrl + '/admin/register', {
      data,
    });
  }

  getAllDrivers(status: DriverStatus): Observable<IResponse> {
    const params = { driverStatus: status };
    return this.httpClient.get<IResponse>(this.baseUrl + '/admin/drivers', { params });
  }

  rateDriver(data: IAddRate): Observable<IResponse> {
    return this.httpClient.post<IResponse>(this.baseUrl + '/user/rate', {
      data,
    });
  }
}
