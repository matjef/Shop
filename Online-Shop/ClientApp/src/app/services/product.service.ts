import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Product} from "../models/product";

@Injectable()
export class ProductService {
  private urlApi = "/api/product";

  constructor(private http: HttpClient) {
  }

  getProducts() {
    return this.http.get(this.urlApi);
  }

  getProduct(id: number) {
    return this.http.get(this.urlApi + '/' + id);
  }

  createProduct(product: Product) {
    return this.http.post(this.urlApi, product);
  }

  updateProduct(product: Product) {
    return this.http.put(this.urlApi, product);
  }

  deleteProduct(id: number) {
    return this.http.delete(this.urlApi + '/' + id);
  }

  addFeatProduct(product: Product) {
    return this.http.put(this.urlApi + '/addFav', product);
  }

  removeFeatProduct(product: Product) {
    return this.http.put(this.urlApi + '/removeFav', product);
  }
}
