import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductCollectionComponent } from './product-collection.component';

const routes: Routes = [{ path: '', component: ProductCollectionComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProductCollectionRoutingModule {}
