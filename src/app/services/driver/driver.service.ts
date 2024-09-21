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
      ...data,
    });
  }

  driverUpdate(data: IDriverRegister): Observable<IResponse> {
    return this.httpClient.post<IResponse>(this.baseUrl + '/admin/register', {
      ...data,
    });
  }

  getAllDrivers(status: DriverStatus): Observable<IResponse> {
    const params = { driverStatus: status };
    return this.httpClient.get<IResponse>(this.baseUrl + '/admin/drivers', {
      params,
    });
  }

  getDriverById(id: number): Observable<IResponse> {
    const params = { id: id };
    return this.httpClient.get<IResponse>(this.baseUrl + '/driver', { params });
  }

  deleteDriver(id: number): Observable<IResponse> {
    const params = { id: id };
    return this.httpClient.delete<IResponse>(this.baseUrl + '/driver', {
      params,
    });
  }

  rateDriver(data: IAddRate): Observable<IResponse> {
    return this.httpClient.post<IResponse>(this.baseUrl + '/user/rate', {
      ...data,
    });
  }

  findDrivers(lng: number, lat: number): Observable<IResponse> {
    const params = { userLatitude: lat, userLongitude: lng };
    return this.httpClient.get<IResponse>(this.baseUrl + '/nearestDrivers', {
      params,
    });
  }
}
