import {Component, OnInit} from "@angular/core";
import {ActivatedRoute, Router} from "@angular/router";
import {Product} from "../../../models/product";
import {AuthService} from "../../../services/auth.service";
import {ProductService} from "../../../services/product.service";


@Component({
  templateUrl: 'product-detail.component.html',
  providers: [ProductService]
})

export class ProductDetailComponent implements OnInit {
  id: number;
  product: Product;
  loaded: boolean = false;

  constructor(private productService: ProductService, private activeRoute: ActivatedRoute, private authService:AuthService, private router: Router) {
    this.id = Number.parseInt(activeRoute.snapshot.params["id"]);
  }

  ngOnInit() {
    if(this.id)
      this.productService.getProducts()
        .subscribe((data:Product[]) => {
          this.product = data.filter(data => data.id === this.id)[0];
          this.loaded = true; });
  }

  addFeat(product: Product){
    this.productService.addFeatProduct(product).subscribe(data => this.product.favorites = true);
  }

  removeFeat(product: Product){
    this.productService.removeFeatProduct(product).subscribe(data => this.product.favorites = false);
  }

  public get isAdminIn(): boolean {
    return this.authService.isUserAdmin();
  }

  public get isLoggedIn(): boolean {
    return this.authService.isUserAuthenticated();
  }

  delete(id: number){
    this.productService.deleteProduct(id).subscribe(data => this.router.navigate(["/catalog"]));
  }
}
