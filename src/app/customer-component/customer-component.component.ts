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

id;
name;
address;

 number;

save="Save";

 tablelick:boolean;

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
        this.formName.reset();
      });
  }

  saveCustomer() {
    if(this.tablelick){

      this.http.put(this.url, this.formName.value,{params:{id:this.formName.value.id}})
        .subscribe(response => {
          this.customers.splice(this.number,1,this.formName.value)
          this.formName.reset();
          this.tablelick=false;
          this.save="save";
        });

    }else {
      this.http.post(this.url, this.formName.value)
        .subscribe(response => {
          this.customers.push(this.formName.value);
          this.formName.reset();
        });
      }
    }

  tableClick(customer) {
    this.save="update"
    this.tablelick=true;
    this.number = this.customers.indexOf(customer);
    this.id=customer.id;
     this.name=customer.name;
     this.address=customer.address;
  }

  clearClick() {
    this.save="save"
    this.tablelick=false;
  }
}
