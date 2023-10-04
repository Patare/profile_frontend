import { Component, ViewChild } from '@angular/core';
import { FormGroup, FormControl, FormArray, FormBuilder } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { OnInit, ChangeDetectorRef } from '@angular/core';
import Swal from 'sweetalert2';
import { ServiceService } from '../service.service';
import {Observable, of} from 'rxjs';
import { Input, Output, EventEmitter } from '@angular/core';
@Component({
  selector: 'app-image',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.css'],
})
export class ImageComponent {
  // access parent data this array
  @Input()  data: any[] = [];  
@Input () gallary_name:any=[]=[];
@Input() User_data1:any[]=[];

//   users:any;
// userabervable$:any;
// cuurentstatus:any;
//   ngOnInit(): void {
//     this.data
//     this.userabervable$=of(this.data);
//     console.log(this.userabervable$);
//     new Observable(item=>{
//       setTimeout(() => {
//         item.next('pending')
//       }, 1000);
//       setTimeout(() => {
//         item.next('completed')
//       }, 2000);

      
//     }).subscribe(result=>{
//       console.log(result)
//       this.cuurentstatus=result;
//     })
//   }


  @ViewChild('fileInput')
  fileInput: any;
  image_Form = this.formBuilder.group({
    file: new FormControl(''),
    descriptions: this.formBuilder.array([]),
  });
  constructor(public _d: DomSanitizer,private cf: ChangeDetectorRef, private service: ServiceService,private formBuilder: FormBuilder) {
    this.image_Form = this.formBuilder.group({
      file: '',
      descriptions: this.formBuilder.array([]),
    });
    this.initializeFormArray(this.photoGallery_array);
    this.initializeFormArray(this.newsGallary_array);
  }
 //end of exiting img and new select img concate
  newSelectimage_Array:any []= []
  newSelectimg_exitingimg(){
     this.newSelectimage_Array =this.data.concat(this.selectedFiles) 
     console.log('new : nd data :',this.newSelectimage_Array.length+" , "+this.data.length+" , "+this.selectedFiles.length)
  }
  //event uplaod button click then select image send back end  
  // updata:any[]=[]
  upload_photosGallery(){
    this.newSelectimg_exitingimg()
    // this.service.get_User().subscribe((updatedData:any) => {
    //     this.data = updatedData;
    //   });
    //   this.data = this.newSelectimage_Array;
  }
 //submit photo gallary image data
 submit_gallary(data: any) {
    const formData = new FormData();
    for (let i = 0; i < this.selectedFiles.length; i++) {
      formData.append('images', this.selectedFiles[i]);
      const descriptionsArray = this.image_Form.get(
        'descriptions'
      ) as FormArray;
      if (descriptionsArray) {
        const descriptionControl = descriptionsArray.get(
          i.toString()
        ) as FormControl;
        const descriptionValue = descriptionControl
          ? descriptionControl.value
          : '';
        formData.append('descriptions', descriptionValue);
        console.log(descriptionsArray);
      }
    }
    this.service.post_profile(formData).subscribe(
      (response) => {
        console.log(response);
      },

      (error) => {
        console.error(error);
      }
    );
  }
  // descriptions  initialize Form Array
  initializeFormArray(items: any[]) {
    const descriptionsArray = this.image_Form.get('descriptions') as FormArray;
    descriptionsArray.clear(); // Clear existing form controls
    items.forEach(() => {
      descriptionsArray.push(new FormControl(''));
    });
  }

  // toggle button (+ -) 
  display = false;
  togglebut() {
    this.display = !this.display;
  }
  display2 = false;
  togglebut2() {
    this.display2 = !this.display2;
  }

//  onclick image then display delete and cancel button increase image size
  onclickimg(img: any,User_data1:any,gallaryname:any) {
    Swal.fire({
      customClass: {
        confirmButton: 'btn btn-danger',
        cancelButton: 'btn btn-success',
      },
      buttonsStyling: true,
      imageUrl: img.filename,
      imageWidth: 400,
      imageHeight: 400,
      imageAlt: 'Custom image',
      showCancelButton: true,
      cancelButtonText: 'Cancel!',
      confirmButtonText: ' Delete it!',
    }).then((result) => {
    
      if (result.isConfirmed) {
        // console.log("here is img info ",img._id);
        // console.log("here is user info ",User_data1[0]._id);
        // console.log("here is gallry info ",gallaryname);
        // this.service.delete_img(img._id,User_data1[0]._id,Pgallary_name)
        this.service.delete_img(User_data1[0]._id,gallaryname,img._id).subscribe(
          (response) => {
            console.log(response);
          },
    
          (error) => {
            console.error(error);
          }
        );
      }
    });
  }

// select multiple image & display 
  /*---------------photo gallery------------------*/
  url1: any = [];
  photoGallery_array: any[] = []; 
  selectedFiles: File[] = [];
  descriptions: string[] = [];
  public file1: any;
  photosGallery(event: any) {
    this.file1 = event.target.files && event.target.files.length;
    if (this.file1 > 0 && this.file1 < 25) {
      let i: number = 0;
      for (const singlefile of event.target.files) {
        var reader = new FileReader();
        reader.readAsDataURL(singlefile);
        this.url1.push(singlefile);
        const descriptionsArray = this.image_Form.get(
          'descriptions'
        ) as FormArray;
        descriptionsArray.push(new FormControl(''));
        this.cf.detectChanges();
        i++;
        reader.onload = (event) => {
          const urls2 = (<FileReader>event.target).result as string;
          this.photoGallery_array.push(urls2);
          this.cf.detectChanges();
        };
      }
      this.initializeFormArray(this.photoGallery_array);
      this.selectedFiles = event.target.files;
    }
  }


  // select multiple image & display 
  /*---------------News gallery------------------*/
  url2: any = [];
  newsGallary_array: any[] = [];
  public file2: any;
  newsGallery(event: any) {
    this.file2 = event.target.files && event.target.files.length;
    if (this.file2 > 0 && this.file2 < 25) {
      let i: number = 0;
      for (const singlefile of event.target.files) {
        var reader = new FileReader();
        reader.readAsDataURL(singlefile);
        this.url2.push(singlefile);
        const descriptionsArray = this.image_Form.get(
          'descriptions'
        ) as FormArray;
        descriptionsArray.push(new FormControl(''));
        this.cf.detectChanges();
        i++;
        reader.onload = (event) => {
          const urls2 = (<FileReader>event.target).result as string;
          this.newsGallary_array.push(urls2);
          this.cf.detectChanges();
        };
      }
    }
  }

  delete_img(array: any) {
    var arrayLength = array.length + 1;
    console.log(arrayLength);
    for (var i = 0; i < array.length; i++) {
      var item = array[Math.floor(Math.random() * array.length)];
      array.splice(item);
    }
  }
   // Trigger the hidden file input's click event
  selectFile() {
    this.fileInput.nativeElement.click();
  }

  onFileSelected(event: any) {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      // Handle the selected file here, e.g., upload to server or process locally
      console.log('Selected file:', selectedFile.name);
    }
  }

}




