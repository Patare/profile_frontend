import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../service.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-profile-form',
  templateUrl: './profile-form.component.html',
  providers: [ServiceService]
})
export class ProfileFormComponent implements OnInit {
  title = "kalyan patare";
  msg: string = "";
  userList:any;
  // userList: any[] = []; 
  constructor(private http:HttpClient){}

//   constructor(private  service: ServiceService ) { 
// //     _serviceService.getApiData().subscribe((data)=>{
// //       console.log(data);
// // this.usersData=data
// //     })
//   }
  // fetchUsersData(): void {
  //   this.service.getApiData().subscribe((data) => {
  //     console.warn(data);
  //     this.usersData = data;
  //   });
  // }
//   ngOnInit() {
// this.service.getApiData().subscribe((data)=>{
//   console.log(data)
//   this.usersData=data;  
// })
//   }
ngOnInit(): void {
  this.http.get('http://localhost:3000/posts').subscribe((data:any)=>{
    console.log(data)
    this.userList=data;
  })
}
getData(){
  this.http.get('http://localhost:3000/posts').subscribe((data:any)=>{
    console.log(data)
    this.userList=data;
})
}
  // getData(){
  //   this.service.getApiData().subscribe((data1:any)=>{
  //     console.log(data1.data)
  //     this.userList=data1.data;  
  //   })
// }


// deleteProduct(id:String){
//   this.service.deleteUser(id).subscribe();
   
//   }
deleteProduct(id:any){
  this.http.delete('http://localhost:3000/posts/'+id).subscribe();
  console.log("delete User")
  alert('delete User')
}
  }
