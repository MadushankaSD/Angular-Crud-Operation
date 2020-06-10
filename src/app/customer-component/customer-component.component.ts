import { Component, OnInit } from '@angular/core';
import {Headers, Http, RequestOptions} from "@angular/http";
import {ActivatedRoute} from "@angular/router";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {webSocket} from "rxjs/webSocket";
import {last} from "rxjs/operators";

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
pageno:number=0;
save="Save";
tablelick:boolean;
desableForword:boolean;
desableBackword:boolean;

  formName = new FormGroup({
    id:new FormControl("",Validators.required),
    name:new FormControl("",Validators.required),
    address:new FormControl("",Validators.required,)
  });

  customers:any[];
  private url='http://localhost:8080/posweb/api/v1/customers';

  constructor(
    private route:ActivatedRoute,
    private http:Http) {
  }

  ngOnInit(): void {
      this.getcustomers(0,5);
  }


  getcustomers(ps,pe){
    this.http.get(this.url,{params:{start:ps,end:pe}})
      .subscribe(responce => {
        this.customers= responce.json();
        if(responce.json().length==0){
          this.desableForword=true;
        }else {
        this.desableForword=false;
        }
      });
  }

  btnDeleteClick($event,customer) {
    $event.stopPropagation();
    if (confirm("Do You Wish To Delete This Customer..!")) {
      this.http.delete(this.url + '/' + customer.id)
        .subscribe(val => {
          let number = this.customers.indexOf(customer);
          this.customers.splice(number, 1);
          this.formName.reset();
          this.tablelick = false;
          this.save = "Save";
        });
    }
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

  backwordClick() {

    this.pageno==0?this.pageno:this.pageno--;
    this.getcustomers(this.pageno,5)
  }

  forwordClick() {
    this.pageno++;
    this.getcustomers(this.pageno,5)
  }
}
