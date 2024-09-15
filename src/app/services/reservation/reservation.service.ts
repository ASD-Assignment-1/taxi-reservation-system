import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IAdminReservation } from 'src/app/interface/IAdminReservation';
import { IUserReservation } from 'src/app/interface/IUserReservation';
import { NON_SECURE, getEndpoint } from 'src/app/utility/constants/end-point';

@Injectable()
export class ReservationService {
  private baseUrl = `${getEndpoint(NON_SECURE)}`;

  constructor(private readonly httpClient: HttpClient) {}

  makeUserReservation(data: IUserReservation): Observable<any> {
    return this.httpClient.post<any>(this.baseUrl + 'reserve', {
      data,
    });
  }

  makeAdminReservation(data: IAdminReservation): Observable<any> {
    return this.httpClient.post<any>(this.baseUrl + 'admin/reserve', {
      data,
    });
  }

  makePayment(reservationId: number): Observable<any> {
    const params = { reservationId: reservationId.toString() };
    return this.httpClient.get<any>(this.baseUrl + 'pay', {
      params,
    });
  }
}
