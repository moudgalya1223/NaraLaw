import { Component, ElementRef, viewChild, } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router'
import { ViewChild } from '@angular/core';;
import translations  from '../assets/translation.json'
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet,FormsModule ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  api_key='AIzaSyCAZm_CP8DgGeVkEb6Ct5Hy_E0IvhEZrSI';
   ts=translations;
  @ViewChild('booking') booking!:ElementRef;
  title = translations.heading;
  client_num=''
  client_casetype=''
  client_name=''
  title_1=translations.title
  pargrah=this.ts.paragraph
  book_your_slot=this.ts.book_your_slot
  lawyer_name=this.ts.Lawyer_name
 client_details:any=[]
  Book_a_Consultation=this.ts['Book a Consultation']
  case_types = [
  'CIVIL',
  'CRIMINAL',
  'FAMILY',
  'PROPERTY',
  'BUSINESS',
  'LABOUR',
  'INTELLECTUAL PROPERTY',
  'TAX'
];

  submit(){
    //const sectionEl = this.booking.nativeElement;
    this.booking.nativeElement.scrollIntoView({
      behavior: 'smooth',
      block: 'center'
    });

    alert('worked')
  }
  client_Details(){
    this.client_details=[this.client_name,this.client_num,this.client_casetype]
    console.log(this.client_details)
    console.log(this.client_name)
    console.log(this.client_num)
    console.log(this.client_casetype)
  }
}
