import { Component } from '@angular/core';
import { ServiceService } from './service.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers:[ServiceService]
})
export class AppComponent {
  title = 'profile_project';
  msg!:string;
 
  constructor(private _serviceService:ServiceService) { }
  ngOnInit(){

  }
}
