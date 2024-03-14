import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Data } from '@angular/router';
import { Observable, of, Subject, switchMap } from 'rxjs';
import { CartService } from 'src/app/services/cart.service';
import { GTMGrandmercadoService } from 'src/app/services/gtm-grandmercado.service';
import { MetaTagService } from 'src/app/services/meta-tag.service';
import { ProductService } from 'src/app/services/product.service';
import { Product } from '../../models/shop.models';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss'],
})
export class ProductDetailsComponent implements OnInit, OnDestroy {
  product!: Product | undefined;
  product$!: Observable<Product>;
  private _unsubscribe = new Subject<any>();
  quantity: number = 1;

  constructor(
    private activatedRoute: ActivatedRoute,
    private productService: ProductService,
    private cartService: CartService,
    private metaTagService: MetaTagService,
    private gtmGrandmercadoService: GTMGrandmercadoService
  ) {}

  ngOnInit(): void {
    // this.activatedRoute.paramMap
    //   .pipe(takeUntil(this._unsubscribe))
    //   .subscribe((params) => {
    //     const productId = params.get('id');
    //     if (productId) {
    //       this.product$ = this.productService.getProduct(productId);
    //     }
    //   });

    this.activatedRoute.paramMap
      .pipe(
        switchMap((params) => {
          const productId = params.get('id');
          if (productId) {
            return this.productService.getProduct(productId);
          } else {
            return of(undefined);
          }
        })
      )
      .subscribe((product) => {
        this.product = product;
        if (product) {
          const routeTitle = `${product?.provider?.name} - ${product?.name}`;
          const data: Data = {
            ogTitle: routeTitle,
            description: product.description,
            ogImage: product.image,
            ogDescription: product.description,
            ogType: 'product',
          };
          this.metaTagService.updateTitle(routeTitle);
          this.metaTagService.updateMetaTags(data);
          this.gtmGrandmercadoService.trackProductView(product);
        }
      });
  }

  ngOnDestroy(): void {
    this._unsubscribe.next(null);
    this._unsubscribe.complete();
  }

  increment() {
    this.quantity++;
  }

  decrement() {
    this.quantity--;
  }

  onAddToCart(product: Product, quantity: number) {
    this.cartService.addToCart(product, quantity);
  }
}
