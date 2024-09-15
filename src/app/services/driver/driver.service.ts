import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DriverStatus } from 'src/app/enums/DriverStatus.enum';
import { IDriverRegister } from 'src/app/interface/IDriverRegister';
import { NON_SECURE, getEndpoint } from 'src/app/utility/constants/end-point';

@Injectable()
export class DriverService {
  private baseUrl = `${getEndpoint(NON_SECURE)}`;

  constructor(private readonly httpClient: HttpClient) {}

  driverRegister(data: IDriverRegister): Observable<any> {
    return this.httpClient.post<any>(this.baseUrl + 'admin/register', {
      data,
    });
  }

  getAllDrivers(status: DriverStatus): Observable<any> {
    const params = { driverStatus: status };
    return this.httpClient.get<any>(this.baseUrl + 'admin/drivers', { params });
  }
}
