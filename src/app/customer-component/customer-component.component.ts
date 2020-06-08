import { Component, OnInit } from '@angular/core';
import {Headers, Http, RequestOptions} from "@angular/http";
import {ActivatedRoute} from "@angular/router";
import {FormControl, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-customer-component',
  templateUrl: './customer-component.component.html',
  styleUrls: ['./customer-component.component.css']
})
export class CustomerComponentComponent implements OnInit{

  formName = new FormGroup({
    id:new FormControl(),
    name:new FormControl(),
    address:new FormControl(),
  });

  customers:any[];
  private url='http://localhost:8080/posweb/api/v1/customers';

  constructor(
    private route:ActivatedRoute,
    private http:Http) {
  }

  ngOnInit(): void {
      this.http.get(this.url)
        .subscribe(responce => {
          this.customers= responce.json();
        });
  }

  btnDeleteClick(customer) {
    this.http.delete(this.url+'/'+customer.id)
      .subscribe(val=>{
        let number = this.customers.indexOf(customer);
        this.customers.splice(number,1);
      });
  }

  saveCustomer() {

      this.http.post('http://localhost:8080/posweb/api/v1/customers', this.formName.value)
        .subscribe(response => {
          this.customers.push(this.formName.value);
          this.formName.reset();
        });
    }
}
