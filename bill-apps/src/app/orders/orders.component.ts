import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {

   // déclarer le order
   orders:any;
   customerId!: number;

   // Pour afficher la liste des customers au démarage
   // Il faut injecter le service HTTP de type HttpClient
   constructor(private http: HttpClient, private router: Router, private route: ActivatedRoute){
    // this.customerId = route.snapshot.params.customerId;
    this.customerId = route.snapshot.params['customerId'];
   }
  
   // Faire un get vers la gateway des microservices
   ngOnInit(): void {
     // Verifier que la BDD H2 n'est pas déconnéctée
     this.http.get("http://localhost:9999/order-service/orders/search/byCustomerId?projection=fullOrder&customerId="+this.customerId).subscribe({next : (data) => {
       this.orders=data;
     },
     error : (err) => {}
     });
   } 
   getOrderDetails(o:any){
   this.router.navigateByUrl("/order-details/"+o.id);
  }

}
