import { Component, OnInit } from '@angular/core';
import { Loader } from '@googlemaps/js-api-loader';

@Component({
  selector: 'app-delivery-payment',
  templateUrl: './delivery-payment.component.html',
  styleUrls: ['./delivery-payment.component.scss']
})
export class DeliveryPaymentComponent implements OnInit{

  ngOnInit(): void {
    let loader = new Loader ({
     apiKey: 'AIzaSyCL-JMy4O1XDqSiM1L3M7J9knk-UkKNyGc'
    })

    loader.load().then(() => {
     new google.maps.Map(document.getElementById("map")!, {
       center: {lat: 49.85573104402327, lng: 24.02668626669665},
       zoom: 15
     })
    })
 }
}
