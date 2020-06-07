import { Component, OnInit } from '@angular/core';
import {Http} from "@angular/http";

@Component({
  selector: 'app-customer-component',
  templateUrl: './customer-component.component.html',
  styleUrls: ['./customer-component.component.css']
})
export class CustomerComponentComponent {

  customers:any[];
  private url='http://localhost:8080/posweb/api/v1/customers';

  constructor(private http:Http) {
    http.get(this.url)
      .subscribe(responce => {
        this.customers= responce.json();
      });
  }

  postCustomer(){
/*
    this.http.post('http://localhost:8080/posweb/api/v1/customers')
      .subscribe(response=>{
        console.log(response)
      });
*/
  }

  btnDeleteClick(customer) {
    this.http.delete(this.url+'/'+customer.id)
      .subscribe(val=>{
        let number = this.customers.indexOf(customer);
        this.customers.splice(number,1);
      });
  }

}
