import { Component } from '@angular/core';
import { FormGroup, FormControl, FormArray, FormBuilder, Validators } from '@angular/forms'
import { DomSanitizer } from '@angular/platform-browser';
import { OnInit, ChangeDetectorRef } from '@angular/core';
import Swal from 'sweetalert2';
import { ServiceService } from '../service.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-update-profile',
  templateUrl: './update-profile.component.html',

  styleUrls: ['./update-profile.component.css']
})
export class UpdateProfileComponent implements OnInit {
  updateForm: FormGroup;
  formDataUpdated = false;
  getAll_data: any;
  constructor(private router: Router, private route: ActivatedRoute,
    public _d: DomSanitizer, private cf: ChangeDetectorRef, private service: ServiceService, private formBuilder: FormBuilder) {
    this.updateForm = this.formBuilder.group({
      PoliticianName: ['', Validators.required],   //vali ....
      PoliticalPartyName: ['', Validators.required],
      PhoneNumber: ['', Validators.required],
      whatsappno: ['', Validators.required],
      MailId: ['', Validators.required],
      Partyofficelocation: ['', Validators.required],
      InstagramId: ['', Validators.required],
      FecebookId: ['', Validators.required],
      TwitterId: ['', Validators.required],
      YouTubeLink: ['', Validators.required],
      PoliticiansInformation: ['', Validators.required],
      PoliticanPhoto:[''],
      PoliticalPartylogo:['']
    });
    
  }


  ngOnInit(): void {

    this.service.get_User().subscribe((data: any) => {
      if (Array.isArray(data)) {
        this.getAll_data = data;

        this.updateForm = this.formBuilder.group({
          PoliticianName: [this.getAll_data[0].PoliticianName, Validators.required],   //vali ....
          PoliticalPartyName: [this.getAll_data[0].PoliticalPartyName, Validators.required],
          PhoneNumber: [this.getAll_data[0].PhoneNumber, Validators.required],
          whatsappno: [this.getAll_data[0].whatsappno, Validators.required],
          MailId: [this.getAll_data[0].MailId, Validators.required],
          Partyofficelocation: [this.getAll_data[0].Partyofficelocation, Validators.required],
          InstagramId: [this.getAll_data[0].InstagramId, Validators.required],
          FecebookId: [this.getAll_data[0].FecebookId, Validators.required],
          TwitterId: [this.getAll_data[0].TwitterId, Validators.required],
          YouTubeLink: [this.getAll_data[0].YouTubeLink, Validators.required],
          PoliticiansInformation: [this.getAll_data[0].PoliticiansInformation, Validators.required]
    
        });

        this.updateForm.valueChanges.subscribe((changes) => {
          this.formDataUpdated = true;
          console.log('form chenges : ', changes);
        })
    
        for (const item of this.getAll_data) {
          for (const item1 of item.PhotoGallery) {
            this.photo_gallary_images.push(item1);
          }
          for (const item2 of item.NewsGallery) {
            this.news_gallary_images.push(item2);
          }
        }
      }

    })
  }

  //get all data back end
  photo_gallary_images: any[] = [];
  news_gallary_images: any[] = []; //send parent to child array using props 
  PhotoGallaryName: string = "PhotoGallery";
  NewsGallaryName: string = "NewsGallery";
  // onInputChange() {
  //   // Set a flag to indicate that the form data has been updated
  //   this.formDataUpdated = true;
  // }

  updateData() {
console.log("value : ", this.updateForm);

    if (this.formDataUpdated) {
      // Push the updated data to the backend or perform any other actions
      // ...

      const updateData = {
        PoliticianName: this.updateForm.get('PoliticianName')!.value,
        PoliticalPartyName: this.updateForm.get('PoliticalPartyName')!.value,
        PhoneNumber: this.updateForm.get('PhoneNumber')!.value,
        whatsappno: this.updateForm.get('whatsappno')!.value,
        MailId: this.updateForm.get('MailId')!.value,
        Partyofficelocation: this.updateForm.get('Partyofficelocation')!.value,
        InstagramId: this.updateForm.get('InstagramId')!.value,
        FecebookId: this.updateForm.get('FecebookId')!.value,
        TwitterId: this.updateForm.get('TwitterId')!.value,
        YouTubeLink: this.updateForm.get('YouTubeLink')!.value,
        PoliticiansInformation: this.updateForm.get('PoliticiansInformation')!.value,
      }
      //  this.sendDataToBackend(updatedData);
      this.sendData(updateData)
      // Reset the flag to indicate that the data has been pushed
      this.formDataUpdated = false;
    } else {
      // No need to update, as the form data hasn't changed
    }
  }

  sendData(updateData: any) {
    this.service.updateUserData(updateData).subscribe(
      (response) => {
        console.log("data updated successfully", response)
      },
      (error) => {
        console.log('error updating data', error)
      }
    )
  }

  /*---------------Politician Photo------------------*/
  // imgsrc='assets/image/templet1/customer/profile/profileImage.jpg';
  imgsrc = '';
  profilePhoto(e: any) {
    var file = e.srcElement.files[0];
    this.imgsrc = window.URL.createObjectURL(file);
  }

  /*---------------Logo------------------*/
  //  imglogo="assets/image/templet1/customer/logo/2.jpg";
  imglogo = '';
  Logo(e: any) {
    var file = e.srcElement.files[0];
    this.imglogo = window.URL.createObjectURL(file);
  }

  //PoliticalPartylogo & PoliticanPhoto base url
  getImageUrl(filename: string): string {
    return `${filename}`;
  }
}
