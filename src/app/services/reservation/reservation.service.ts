import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IAdminReservation } from 'src/app/interface/IAdminReservation';
import { IResponse } from 'src/app/interface/IResponse';
import { IUserReservation } from 'src/app/interface/IUserReservation';
import { NON_SECURE, getEndpoint } from 'src/app/utility/constants/end-point';

@Injectable()
export class ReservationService {
  private baseUrl = `${getEndpoint(NON_SECURE)}`;
  protected markers: any[] = [];

  constructor(private readonly httpClient: HttpClient) {}

  setMarkers(markers:any[]){
    this.markers = markers;
  }

  getMarkers(){
    return this.markers;
  }

  makeUserReservation(data: IUserReservation): Observable<IResponse> {
    return this.httpClient.post<IResponse>(this.baseUrl + '/reserve', {
      ...data,
    });
  }

  makeAdminReservation(data: IAdminReservation): Observable<IResponse> {
    return this.httpClient.post<IResponse>(this.baseUrl + '/admin/reserve', {
      ...data,
    });
  }

  makePayment(reservationId: number): Observable<IResponse> {
    const params = { reservationId: reservationId.toString() };
    return this.httpClient.get<IResponse>(this.baseUrl + '/user/pay', {
      params,
    });
  }

  getAllOngoingTrip(): Observable<IResponse> {
    return this.httpClient.get<IResponse>(this.baseUrl + '/admin/onGoingTrips');
  }

  getFullTotalIncome(): Observable<IResponse> {
    return this.httpClient.get<IResponse>(
      this.baseUrl + '/admin/fullTotalAmount'
    );
  }

  getLast5Reservations(): Observable<IResponse> {
    return this.httpClient.get<IResponse>(this.baseUrl + '/admin/reservations');
  }

  calculateAmount(
    fromLat: number,
    fromLng: number,
    toLat: number,
    toLng: number
  ): Observable<IResponse> {
    const params = {
      latitude1: fromLat,
      longitude1: fromLng,
      latitude2: toLat,
      longitude2: toLng,
    };
    return this.httpClient.get<IResponse>(
      this.baseUrl + '/user/getAmount',
      {
        params,
      }
    );
  }
}
