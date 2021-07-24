import {Component, OnInit} from "@angular/core";
import {ActivatedRoute, Router} from "@angular/router";
import {Product} from "../../../models/product";
import {ProductService} from "../../../services/product.service";


@Component({
  templateUrl: 'product-edit.component.html'
})

export class ProductEditComponent implements OnInit{
  id: number;
  product: Product;
  loaded: boolean = false;

  constructor(private productService: ProductService, private router: Router, activeRoute: ActivatedRoute) {
    this.id = Number.parseInt(activeRoute.snapshot.params["id"]);
  }

  ngOnInit() {
    if(this.id)
      this.productService.getProduct(this.id)
        .subscribe((data: Product) => {
          this.product = data;
          if (this.product != null) this.loaded = true;
        })
  }

  save() {
    this.productService.updateProduct(this.product).subscribe(data => this.router.navigateByUrl("/catalog"));
  }
}
