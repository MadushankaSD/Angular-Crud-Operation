import {Component} from '@angular/core';
import {Router} from "@angular/router"
import {FormControl, FormGroup, Validators} from "@angular/forms";



@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})

export class LoginFormComponent {
  invalidLogin: boolean;

  constructor(
    private router: Router) { }

  signIn(val){
    console.log(val);
   /* this.authService.login(val)
      .subscribe(result => {
        if (result)
          this.router.navigate(['/']);
        else
          this.invalidLogin = true;
      });*/
  }

  forcusPassword() {

  }
}
