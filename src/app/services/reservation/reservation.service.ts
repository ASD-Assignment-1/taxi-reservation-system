import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NON_SECURE, getEndpoint } from 'src/app/utility/constants/end-point';

@Injectable()
export class ReservationService {
  private baseUrl = `${getEndpoint(NON_SECURE, 'reservation')}`;

  constructor(private readonly httpClient: HttpClient) {}
}
