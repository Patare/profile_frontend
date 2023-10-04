import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module'; 
import { AppComponent } from './app.component';
import { ProfileFormComponent } from './profile-form/profile-form.component';
import { PhotoGallaryComponent } from './photo-gallary/photo-gallary.component';
import { HttpClientModule } from '@angular/common/http';

import { UpdateProfileComponent } from './update-profile/update-profile.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ImageComponent } from './image/image.component';

@NgModule({
  declarations: [
    AppComponent,
    ProfileFormComponent,
    PhotoGallaryComponent,
   
    UpdateProfileComponent,
    ImageComponent,
 
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
  
   
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }


