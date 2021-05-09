import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {MessageService} from 'primeng/components/common/messageservice';
import { Message } from '@angular/compiler/src/i18n/i18n_ast';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent{

  homePage=false;
  packagePage=false;
  continent:string;
  successMessage:string = null;
  email:string;
  constructor(private router: Router,private messageService:MessageService) {
   }
  

  showInfo() {
    console.log(this.email)
    this.successMessage = "Thank you for subscribing. Updates will be sent to "+this.email;
    this.messageService.add({severity:'success', summary: this.successMessage, detail:''});
  }

}
