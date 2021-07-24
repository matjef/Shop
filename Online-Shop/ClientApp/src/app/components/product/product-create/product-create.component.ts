import {Component} from "@angular/core";
import {Router} from "@angular/router";
import {Product} from "../../../models/product";
import {ProductService} from "../../../services/product.service";


@Component({
  templateUrl: './product-create.component.html'
})
export class ProductCreateComponent{
  product: Product = new Product();
  constructor(private productService: ProductService, private router: Router) {
  }
  save(){
    this.productService.createProduct(this.product).subscribe(data=> this.router.navigateByUrl("/catalog"))
  }
}
