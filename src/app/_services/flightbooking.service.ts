import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AllHttpUrls } from '../Common/AllUrl';

@Injectable({
  providedIn: 'root'
})
export class FlightbookingService {
  public allHttpUrlObj=new AllHttpUrls();
  constructor(private myhttp:HttpClient) { }

  //searchFlightUrl:string='http://localhost:33953/Airline/SearchFlights';
  //flightBookingUrl:string='http://localhost:33953/Airline/Booking';
  //getDiscountDetailsUrl:string='http://localhost:33953/Airline/GetDiscountUsingCode/';
  //getAllBookedTicketDetailsUrl:string='http://localhost:33953/Airline/GetAllBookedTicket/';
  //CancelBookedTicketUrl:string='http://localhost:33953/Airline/CancleBookTicket?pnr=';
  //getBookedTicketDetailViaPNRsUrl:string='http://localhost:33953/Airline/GetBookedTicketDetails/';
 // getAllBookedTicketHistoryUrl:string='http://localhost:33953/Airline/GetBookedTicketHistoryViaUserId/';

  
  GetSearchFlights(searchFlightReq:any)
  {
    console.log("REQ : "+JSON.stringify(searchFlightReq));
    
     return this.myhttp.post<any>(this.allHttpUrlObj.baseUrl+'Airline/SearchFlights',searchFlightReq);
  }

  InsertFlightBookingDetails(flightBookingReq:any){

    return this.myhttp.post(this.allHttpUrlObj.baseUrl+'Airline/Booking',flightBookingReq);

  }

  GetDiscountsDetails(discountCode:any)
  {
    return this.myhttp.get<any>(this.allHttpUrlObj.baseUrl+'Airline/GetDiscountUsingCode/'+discountCode);
  }
   
  GetAllBookedTickets(userId:any)
  {
    return this.myhttp.get<any>(this.allHttpUrlObj.baseUrl+'Airline/GetAllBookedTicket/'+userId);
  }
  
  CancelBookedTicket(pnr:any)
  {
    let body = JSON.stringify(pnr);
    return this.myhttp.patch(this.allHttpUrlObj.baseUrl+'Airline/CancleBookTicket?pnr='+pnr,body);
  }

  GetBookedTicketDetailsViaPNR(pnr:any)
  {
    return this.myhttp.get<any>(this.allHttpUrlObj.baseUrl+'Airline/GetBookedTicketDetails/'+pnr);
  }

  GetAllBookedTicketsHistory(userId:any)
  {
    return this.myhttp.get<any>(this.allHttpUrlObj.baseUrl+'Airline/GetBookedTicketHistoryViaUserId/'+userId);
  }

}
