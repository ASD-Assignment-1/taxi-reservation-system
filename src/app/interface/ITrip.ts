import { ReservationStatus } from "../enums/ReservationStatus.enum";
import { IRate } from "./IRate";
import { IUser } from "./IUser";

export interface ITrip {
  id: number;
  userDto: IUser;
  driverDto: any;
  reveredTime: string;
  paymentAmount: number;
  pickupLatitude:number;
  pickupLongitude: number;
  dropLatitude: number;
  dropLongitude: number;
  status: ReservationStatus;
  ratingDto:IRate;
}
