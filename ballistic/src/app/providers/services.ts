import { Injectable } from "@angular/core";
import { HttpClient,HttpHeaders } from '@angular/common/http';

@Injectable()
export class Services {
	constructor(
        public http: HttpClient
    ) {
	}

	postRequest(customer) {
        let apiurl = "https://ballistictest.azurewebsites.net/api/customer";
      
        
        const event = new Date();

        let data = { firstcustomer: customer, timestamp: event.toISOString() };
        return this.http.post(apiurl, data, {headers:new HttpHeaders({
                'Access-Control-Allow-Origin': '*',
                'x-client-id': '12345',
                'Content-Type': 'application/json',
                'Access-Control-Allow-Methods': 'DELETE, POST, GET, OPTIONS',

        })});
	}

	getCustomers() {
        return this.http.get("https://ballistictest.azurewebsites.net/api/customers");
	}
}
