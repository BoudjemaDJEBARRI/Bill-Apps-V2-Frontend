import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.css']
})
export class OrderDetailsComponent implements OnInit {

   // déclarer le order
   orderDetails:any;
   orderId!: number;

   // Pour afficher la liste des customers au démarage
   // Il faut injecter le service HTTP de type HttpClient
   constructor(private http: HttpClient, private router: Router, private route: ActivatedRoute){
    // this.orderId = route.snapshot.params.orderId;
    this.orderId = route.snapshot.params['orderId'];
   }
  
   // Faire un get vers la gateway des microservices
   ngOnInit(): void {
     // Verifier que la BDD H2 n'est pas déconnéctée
     this.http.get("http://localhost:9999/order-service/fullOrder/"+this.orderId).subscribe({next : (data) => {
       this.orderDetails=data;
     },
     error : (err) => {}
     });
   } 


}
