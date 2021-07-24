import {Component, OnInit, Output} from "@angular/core";
import {Product} from "../../models/product";
import {AuthService} from "../../services/auth.service";
import {ProductService} from "../../services/product.service";


@Component({
  templateUrl: 'catalog.component.html',
  providers: [ProductService]
})
export class CatalogComponent implements OnInit{
  products: Product[];
  constructor(private productService:ProductService, private authService:AuthService) {
  }

  load(){
    this.productService.getProducts().subscribe((data: Product[]) => this.products = data);
  }

  ngOnInit() {
    this.load();
  }

  refreshProducts(){
    this.load();
  }

  public get isAdminIn(): boolean {
    return this.authService.isUserAdmin();
  }

}
