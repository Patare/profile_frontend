import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; 
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ServiceService {

constructor(private http: HttpClient){}
deleteUser(id:any){
return this.http.delete(`this.deleteuser/${id}`)
}

  // getPosts(postData:any):Observable<any>{
  //   return this.http.post(this.urlPost,postData)
  // }
  // getPosts(){
  //   return this.http.post(urlPost,this.postData).subscribe((data:any)=>{
  //     console.log(data);
  //     alert("successfully")
  //   }
  //     )}
  //  url='http://localhost:3000/posts'
  createUser(data:any){
    return this.http.post(this.url,data)
  }

  profileId:string='651568fb476505af7399ce00';
  // gallary:string="PhotoGallery"
  gallary:string="NewsGallery"


  url="http://localhost:3000/profile"
  post_profile(data:any){
    return this.http.post(`${this.url}/${this.profileId}/${this.gallary}`,data)
    // console.log("${this.url}/${this.profileId}")
  }



  deleteUrl = "http://localhost:3000/profile"
  delete_img(profileId:any,gallaryname:any,imageId:any) {
    return this.http.delete(`${this.deleteUrl}/${profileId}/${gallaryname}/${imageId}`);
  }


  update_url="http://localhost:3000/profile/updateprofileById"
  updateUserData(data:any){
    return this.http.put(`${this.update_url}/${this.profileId}`,data)
  }
  
  geturl="http://localhost:3000/profile/getAllRegisterUser";
  get_User() {
    return this.http.get(this.geturl)
    
  }
}
