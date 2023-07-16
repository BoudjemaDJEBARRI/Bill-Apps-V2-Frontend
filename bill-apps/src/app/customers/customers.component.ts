import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css']
})
export class CustomersComponent implements OnInit {
  // déclarer le customer
  customers : any;

  // Pour afficher la liste des customers au démarage
  // Il faut injecter le service HTTP de type HttpClient
  constructor(private http: HttpClient, private router: Router){}
 
  // Faire un get vers la gateway des microservices
  ngOnInit(): void {
    // Verifier que la BDD H2 n'est pas déconnéctée
    this.http.get("http://localhost:9999/customer-service/customers?projection=fullCustomer").subscribe({next : (data) => {
      this.customers=data;
    },
    error : (err) => {}
    });
  } 

  getOrders(c:any){
    this.router.navigateByUrl("/orders/"+c.id);
  }

}
