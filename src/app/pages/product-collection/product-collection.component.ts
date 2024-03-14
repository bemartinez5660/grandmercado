import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subject, takeUntil } from 'rxjs';
import { Collection } from 'src/app/models/shop.models';
import { GTMGrandmercadoService } from 'src/app/services/gtm-grandmercado.service';
import { MetaTagService } from 'src/app/services/meta-tag.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-collection',
  templateUrl: './product-collection.component.html',
  styleUrls: ['./product-collection.component.scss'],
})
export class ProductCollectionComponent {
  collection$!: Observable<Collection>;

  params$ = this.route.paramMap;
  _unsubscribe = new Subject();

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    private metaTagsService: MetaTagService,
    private gtmGrandmercadoService: GTMGrandmercadoService
  ) {}

  ngOnInit(): void {
    this.route.paramMap
      .pipe(takeUntil(this._unsubscribe))
      .subscribe((params) => {
        const collection = params.get('collection-slug');

        if (collection) {
          this.collection$ =
            this.productService.getProductsByCollection(collection);
        }
      });
  }

  ngOnDestroy(): void {
    this._unsubscribe.next(null);
    this._unsubscribe.complete();
  }
}
