import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './pages/home/home.component';
import { DiscountsComponent } from './pages/discounts/discounts.component';
import { ProductComponent } from './pages/product/product.component';
import { DeliveryPaymentComponent } from './pages/delivery-payment/delivery-payment.component';
import { AboutComponent } from './pages/about/about.component';

import { AdminComponent } from './admin/admin.component';
import { AdminCategoryComponent } from './admin/admin-category/admin-category.component';
import { AdminProductComponent } from './admin/admin-product/admin-product.component';
import { AdminDiscountComponent } from './admin/admin-discount/admin-discount.component';
import { AdminOrderComponent } from './admin/admin-order/admin-order.component';
import { ProductInfoComponent } from './pages/product-info/product-info.component';
import { ProductInfoResolver } from './shared/services/product/product-info.resolver';
import { DiscountInfoComponent } from './pages/discount-info/discount-info.component';
import { DiscountInfoResolver } from './shared/services/discount/discount-info.resolver';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'discount', component: DiscountsComponent },
  { path: 'discount/:id', component: DiscountInfoComponent,
    resolve: {
      discountInfo: DiscountInfoResolver
    } },
  { path: 'product-category/:category', component: ProductComponent },
  { path: 'product-category/:category/:id', component: ProductInfoComponent,
    resolve: {
      productInfo: ProductInfoResolver
    } },
  { path: 'dostavka-ta-oplata', component: DeliveryPaymentComponent },
  { path: 'about-us', component: AboutComponent },
  { path: 'admin', component: AdminComponent, children: [
    { path: 'category', component: AdminCategoryComponent },
    { path: 'product', component: AdminProductComponent },
    { path: 'discount', component: AdminDiscountComponent },
    { path: 'order', component: AdminOrderComponent },
    { path: '', pathMatch: 'full', redirectTo: 'discount' }
  ] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
