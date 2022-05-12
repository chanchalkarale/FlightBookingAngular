import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core'; 
import { Observable } from 'rxjs';
import { AllHttpUrls } from '../Common/AllUrl';
import { Airlines } from '../_models/airlines.model';

@Injectable({
  providedIn: 'root'
})
export class AirlineService {

  headers: Headers;
  public allHttpUrlObj=new AllHttpUrls();
  constructor(private myhttp:HttpClient) {  
        
  }
  
  //regUrl:string='http://localhost:33953/Airline/GetAirlines';
  //getAllAirlines:string='http://localhost:33953/Airline/GetAllAirlines';
  //inventoryUrl:string='http://localhost:33953/Airline/Inventory';
  //airlineFlightsDetailsUrl:string='http://localhost:33953/Airline/GetAllAirlineFlightsDetails';
  //addAirlinesUrl:string='http://localhost:33953/Airline/register';
  //removeAirlineFlightsDetailsUrl:string='http://localhost:33953/Airline/RemoveFlight?flightId=';

 // blockUnblockAirlineUrl:string='http://localhost:33953/Airline/BlockUnblockAirline';
  //removeAirlineUrl:string='http://localhost:33953/Airline/DeleteAirline';
 // getAllDiscountsUrl:string='http://localhost:33953/Airline/GetAllDiscount';
  //removeDiscountUrl:string='http://localhost:33953/Airline/RemoveDiscount';
  //addDiscountUrl:string='http://localhost:33953/Airline/AddDiscount';
  listAirlineDetails:Airlines[]=[];

  GetAirlinesList()
  {
    return this.myhttp.get<any>(this.allHttpUrlObj.baseUrl+'Airline/GetAirlines');
  }
  
  AddAirlineNames(airlineDetails:any)
  {
     return this.myhttp.post(this.allHttpUrlObj.baseUrl+'Airline/register',airlineDetails);
  }

  GetAllAirlinesList()
  {
    return this.myhttp.get<any>(this.allHttpUrlObj.baseUrl+'Airline/GetAllAirlines');
  }
 
  InsertAirlineSchedule(airlineReq:any)
  {
    console.log("Insert AIrline : "+airlineReq);
    return this.myhttp.post(this.allHttpUrlObj.baseUrl+'Airline/Inventory',airlineReq);
  } 
  
  GetAllAirlineFlightsDetails()
  {
    return this.myhttp.get<any>(this.allHttpUrlObj.baseUrl+'Airline/GetAllAirlineFlightsDetails');
  }

  RemoveAirlineFlight(flightId:number)
  {  
    let body = JSON.stringify(flightId);
    console.log("FFFF : "+flightId);
     return this.myhttp.patch(this.allHttpUrlObj.baseUrl+'Airline/RemoveFlight?flightId='+flightId,body);
  }

  BlockUnblockAirline(airlineId:number,status:number)
  { 
    let body = JSON.stringify(airlineId);
     return this.myhttp.patch(this.allHttpUrlObj.baseUrl+'Airline/BlockUnblockAirline'+"?airlineId="+airlineId+"&status="+status,body);
  }

  RemoveAirline(airlineId:number)
  { 
    let body = JSON.stringify(airlineId);
    console.log("FFFF : "+airlineId);
     return this.myhttp.patch(this.allHttpUrlObj.baseUrl+'Airline/DeleteAirline'+"?airlineId="+airlineId,body);
  }


  AddDiscount(discountDetails:any)
  {
     return this.myhttp.post(this.allHttpUrlObj.baseUrl+'Airline/AddDiscount',discountDetails);
  }

  GetAllDiscountDetails()
  {
    return this.myhttp.get<any>(this.allHttpUrlObj.baseUrl+'Airline/GetAllDiscount');
  }

  RemoveDiscount(discountId:number)
  { 
    let body = JSON.stringify(discountId); 
     return this.myhttp.patch(this.allHttpUrlObj.baseUrl+'Airline/RemoveDiscount'+"?discountId="+discountId,body);
  }

}
