import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BlockScrollService {

  private scrollBlocked = false;

  blockScroll() {
    this.scrollBlocked = true;
    document.body.style.overflow = 'hidden';
  }

  allowScroll() {
    this.scrollBlocked = false;
    document.body.style.overflow = 'auto';
  }

  isScrollBlocked() {
    return this.scrollBlocked;
  }
}
