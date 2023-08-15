import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header/header.component';
import { ClickOutsideDirective } from './shared/directives/click-outside.directive';
import { HomeComponent } from './pages/home/home.component';
import { BannerMonoComponent } from './pages/home/banner-mono/banner-mono.component';
import { FooterComponent } from './components/footer/footer/footer.component';
import { DiscountsComponent } from './pages/discounts/discounts.component';
import { ProductComponent } from './pages/product/product.component';
import { DeliveryPaymentComponent } from './pages/delivery-payment/delivery-payment.component';
import { AboutComponent } from './pages/about/about.component';

import { AdminComponent } from './admin/admin.component';
import { AdminCategoryComponent } from './admin/admin-category/admin-category.component';
import { AdminProductComponent } from './admin/admin-product/admin-product.component';
import { AdminDiscountComponent } from './admin/admin-discount/admin-discount.component';
import { AdminOrderComponent } from './admin/admin-order/admin-order.component';
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideStorage,getStorage } from '@angular/fire/storage';
import { CategoriesMenuComponent } from './pages/home/categories-menu/categories-menu.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ClickOutsideDirective,
    HomeComponent,
    BannerMonoComponent,
    FooterComponent,
    DiscountsComponent,
    ProductComponent,
    DeliveryPaymentComponent,
    AboutComponent,
    AdminComponent,
    AdminCategoryComponent,
    AdminProductComponent,
    AdminDiscountComponent,
    AdminOrderComponent,
    CategoriesMenuComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,     
    ReactiveFormsModule,
    HttpClientModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideStorage(() => getStorage())
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
