import { FlightBookingUser } from "./flight-booking-user.model";

 
export class FlightBookingmodel {
 
    FlightId:number;
    UserId:number;
    Journey:number;
    ClassStatus:number;
    DiscountId:number;

    userBookingDetailsRequestList: Array<FlightBookingUser>=[];
   
 
}
