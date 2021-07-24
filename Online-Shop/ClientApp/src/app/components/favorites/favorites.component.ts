import {Component, OnInit} from "@angular/core";
import {ProductService} from "../../services/product.service";
import {Product} from "../../models/product";


@Component({
  templateUrl: 'favorites.component.html',
  providers: [ProductService]
})
export class FavoritesComponent implements OnInit{
  products: Product[];
  constructor(private productService:ProductService) {
  }

  load(){
    this.productService.getProducts().subscribe((data: Product[]) => this.products = data.filter(data => data.favorites === true));
  }
  ngOnInit() {
    this.load();
  }

  refreshProducts(){
    this.load();
  }
}
