import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  // déclarer le produit
  products : any;

  //Pour afficher la liste des produit au démarage
  // Il faut injecter le service HTTP de type HttpClient
  constructor(private http: HttpClient){}
 
  // Faire un get vers la gateway des microservices
  ngOnInit(): void {
    // Verifier que la BDD H2 n'est pas déconnéctée
    this.http.get('http://localhost:9999/inventory-service/products?projection=fullProduct').subscribe({next : (data) => {
      this.products=data;
    },
    error : (err) => {}
    });
  } 
}
