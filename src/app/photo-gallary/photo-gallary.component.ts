import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../service.service';

@Component({
  selector: 'app-photo-gallary',
  templateUrl: './photo-gallary.component.html',
  providers: [ServiceService]
})
export class PhotoGallaryComponent implements OnInit {

  // photoGallery = [
  //   {
  //     filename: "1695016371084--react_native cer.jpg",
  //     description: "",
  //     _id: "6507e5b3fc8ca69b2e0d5fa8"
  //   },
  
  // ];

  // photoGallery: any[] = [];
  userlist: any[] = [];
  
  imageBasePath = 'uploads/';
  constructor(private service: ServiceService) {}

  ngOnInit(): void {
    this.service.get_User().subscribe((data: any) => {
      if (Array.isArray(data)) {
        this.userlist = data;
        // this.photoGallery=data;
        console.log(this.userlist)
      }
      console.log(data);
    });
  }
// In your Angular component
getImageUrl(filename: string): string {
  return `http://localhost:3000/profile/getImage/${filename}`;
  // return filename;
}


  getImagesUrl(folder: any,filename:string):string{
return `http://localhost:3000/profile/getAllImagesFromPhotoGallery/${filename}`
  }
}
