import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DeviceService {
  public isMobile$ = new BehaviorSubject<boolean>(false);

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    if (isPlatformBrowser(this.platformId)) {
      this.checkIfMobile();
    }
  }

  private checkIfMobile(): void {
    const isMobile = window.innerWidth <= 1000; 
    this.isMobile$.next(isMobile);
  }
}
