import {Component, EventEmitter, Input, Output} from "@angular/core";
import {AuthService} from "../../../services/auth.service";
import {ProductService} from "../../../services/product.service";
import {Product} from "../../../models/product";


@Component({
  selector: "product-card",
  templateUrl: 'product-card.component.html',
  styleUrls: ['product-card.component.css']
})
export class ProductCardComponent {
  @Input() product: Product;
  @Output() refresh = new EventEmitter();
  refreshProducts() {
    this.refresh.emit()
  }

  constructor(private authService: AuthService, private productService: ProductService) {
  }

  public get isLoggedIn(): boolean {
    return this.authService.isUserAuthenticated();
  }

  public get isAdminIn(): boolean {
    return this.authService.isUserAdmin();
  }

  delete(id: number) {
    this.productService.deleteProduct(id).subscribe(data => this.refreshProducts());
  }

  addFeat(product: Product) {
    this.productService.addFeatProduct(product).subscribe(data => this.product.favorites = true);
  }

  removeFeat(product: Product) {
    this.productService.removeFeatProduct(product).subscribe(data => this.product.favorites = false);
  }
}
