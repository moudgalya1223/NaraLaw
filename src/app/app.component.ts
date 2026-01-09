import { Component, ElementRef, viewChild, } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router'
import { ViewChild } from '@angular/core';;
import translations  from '../assets/translation.json'
import { FormsModule } from '@angular/forms';
import e from 'express';
import emailjs from '@emailjs/browser';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet,FormsModule ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
   ts=translations;
  @ViewChild('booking') booking!:ElementRef;
  @ViewChild('about_me') about_me!:ElementRef;
  @ViewChild('onlineconsultation') onlineconsultation!:ElementRef;
  title = translations.heading;
  client_num=''
  client_casetype=''
  client_toname=''
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
online_consultation(){
  this.onlineconsultation.nativeElement.scrollIntoView({
    behavior: 'smooth',
    block: 'center'
  })
}
aboutme(){
  this.about_me.nativeElement.scrollIntoView({
    behavior: 'smooth',
    block: 'center'
  })

}
consultationPlans = [
  {
    id: 0,
    title: 'First Consultation',
    duration: '10 Minutes',
    price: 0,
    isFree: true
  },
  {
    id: 1,
    title: 'Quick Consultation',
    duration: '10 Minutes',
    price: 500,
    isFree: false
  },
  {
    id: 2,
    title: 'Standard Consultation',
    duration: '30 Minutes',
    price: 1200,
    isFree: false
  },
  {
    id: 3,
    title: 'Detailed Consultation',
    duration: '1 Hour',
    price: 2000,
    isFree: false
  }
];

selectedPlan: any = null;


selectPlan(plan: any) {
  this.selectedPlan = plan;
}

proceedToPayment() {
  console.log('Selected Plan:', this.selectedPlan);
  this.upipayment()
  // Call Razorpay / Stripe / Payment API here
}
upipayment() {
  const upiId = '7794837002@ptsbi'; // Make sure this is a valid UPI ID
  const payeeName = 'BVRNR';
  const amount = this.selectedPlan.price; // dynamic amount
  const note = `Online Consultation - ${this.selectedPlan.duration}`; // optional note

  // Encode note only if you want to include it
  const encodedNote = encodeURIComponent(note);

  // Construct the UPI URL (without tid)
  const upiUrl = `upi://pay?pa=${upiId}&pn=${encodeURIComponent(payeeName)}&am=${amount}&cu=INR&tn=${encodedNote}`;

  console.log('UPI URL:', upiUrl);

  // Redirect to UPI app
  window.location.href = upiUrl;
}


  submit(){
    //const sectionEl = this.booking.nativeElement;
    this.booking.nativeElement.scrollIntoView({
      behavior: 'smooth',
      block: 'center'
    });

    alert('worked');  console.log("tetd",this.client_toname)
  }

  client_Details() {

    const message = `
  Name: ${this.client_name}
  Number: ${this.client_num}
  Case Type: ${this.client_casetype}
  Email: ${this.client_toname}
    `;
  
    const encodedMessage = encodeURIComponent(message);
  
    const phoneNumber = '+919290690940'; // include country code, no + or spaces
  
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
  
    // Open WhatsApp with pre-filled message
    window.open(whatsappUrl, '_blank');
  
    // ---------- EmailJS Part ----------
    const templateParams = {
      to_name: this.client_name,
      from_name: 'Datta',
      message: message,
      mail: this.client_toname
    };
    
  
    emailjs
      .send('service_cus7xbl', 'test', templateParams, 'K08KFexwI1rYlYaI0')
      .then((response) => {
        console.log('Email sent!', response.status, response.text);
        alert('Client details sent successfully!');
      })
      .catch((err) => {
        console.error('Failed to send email', err);
        alert('Failed to send email.');
      });
  
    this.client_details = [
      this.client_name,
      this.client_num,
      this.client_casetype,
      this.client_toname
    ];
  }
  
}


