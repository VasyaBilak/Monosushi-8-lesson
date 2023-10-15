import { Component, OnChanges, OnInit, DoCheck } from '@angular/core';
import { IProductResponse } from 'src/app/shared/interfaces/product/product.interface';
import { OrderService } from 'src/app/shared/services/order/order.service';
import { BlockScrollService } from 'src/app/shared/services/blockScroll/block-scroll.service';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { ROLE } from 'src/app/shared/constants/role.constant';
import { AccountService } from 'src/app/shared/services/account/account.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})

export class HeaderComponent implements OnInit, OnChanges, DoCheck {
  
  activeStatus: boolean = false;
  public total = 0;
  public basket: Array<IProductResponse> = [];
  public isProducts: Boolean = false;
  public openCart: Boolean = false;
  private eventSubscription!: Subscription;
  public isLogin = false;
  public loginUrl = '';
  public loginPage = '';

  constructor(
    private orderService: OrderService,
    private activatedRoute: ActivatedRoute,
    private scrollService: BlockScrollService,
    private accountService: AccountService
  ) { }

  ngOnInit(): void {
    this.loadBasket();
    this.updateBasket();
    this.checkLS();
    this.checkUserLogin();
    this.checkUpdatesUserLogin();
  }

  ngOnChanges(): void {
    this.checkLS();
  }

  ngDoCheck(): void {
    this.checkScroll();
  }

  changeActive() {
    this.activeStatus = !this.activeStatus;
  }

  closeMenu() {
    this.activeStatus = false;
  }

  loadBasket(): void {
    if(localStorage.length > 0 && localStorage.getItem('basket')){
      this.basket = JSON.parse(localStorage.getItem('basket') as string);
    }
    this.getTotalPrice();
  }

  getTotalPrice(): void {
    this.total = this.basket
      .reduce((total: number, prod: IProductResponse) => total + prod.count * prod.price, 0);
  }

  updateBasket(): void {
    this.orderService.changeBasket.subscribe(() => {
      this.loadBasket();
    })
  }

  getNumberOfProducts() {
    const basketData = localStorage.getItem('basket');
    if (basketData === null) {
      return 0; 
    }

    const numberProducts = JSON.parse(basketData).length;
    return numberProducts;
  }

  checkLS(): void {
    if (localStorage.length > 0 && localStorage.getItem('basket')) {
      this.isProducts = true;
    } else if (localStorage.length === 0 && localStorage.getItem('basket')) {
      this.isProducts = false;
    }
  }

  showCart(): void {
    this.openCart = !this.openCart;
  }

  closeCart() {
    this.openCart = false;
  }

  openCard(): void {
    this.openCart = true;
  }

  blockScroll(): void {
    this.scrollService.blockScroll();
  }

  allowScroll(): void {
    this.scrollService.allowScroll();
  }

  checkScroll(): void {
    if (this.openCart === false) {
      this.allowScroll();
    } else if (this.openCart === true){
      this.blockScroll();
    }
  }

  checkUserLogin(): void {
    const currentUser = JSON.parse(localStorage.getItem('currentUser') as string);
    if(currentUser && currentUser.role === ROLE.ADMIN){
      this.isLogin = true;
      this.loginUrl = 'admin';
      this.loginPage = 'Admin';
    } else if(currentUser && currentUser.role === ROLE.USER) {
      this.isLogin = true;
      this.loginUrl = 'cabinet';
      this.loginPage = 'Cabinet';
    } else {
      this.isLogin = false;
      this.loginUrl = '';
      this.loginPage = '';
    }
  }

  checkUpdatesUserLogin(): void {
    this.accountService.isUserLogin$.subscribe(() => {
      this.checkUserLogin();
    })
  }

}
