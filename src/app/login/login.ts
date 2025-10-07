import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms'; 
import { loginService } from './login.service';

@Component({
  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {
  eMail: string = "";
  password: string = "";
  constructor(private loginService: loginService){}

  login()
  {
    console.log("Correo: " + this.eMail + ", pss:" + this.password);

    this.loginService.login(this.eMail, this.password);

    console.log(this.loginService.getIdToken());
  }
}
