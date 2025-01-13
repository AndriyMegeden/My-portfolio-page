import { isPlatformBrowser } from '@angular/common';
import {
  Component,
  ElementRef,
  AfterViewInit,
  ViewChild,
  Inject,
  PLATFORM_ID,
} from '@angular/core';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent implements AfterViewInit {
  // отримуємо доступ до header по #headerEl
  @ViewChild('headerEl') headerEl!: ElementRef;

  constructor(
    private elRef: ElementRef,
    @Inject(PLATFORM_ID) private platformid: Object
  ) {}
  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformid)) {
      gsap.registerPlugin(ScrollTrigger);
      gsap.fromTo(
        '.header',
        { height: 100, duration: 0.6 },
        {
          duration: 0.6,
          height: 60,
          scrollTrigger: {
            toggleActions: 'play reverse play reverse',
            // отримуємо доступ до кореневого компонента тобто до app-header
            trigger: this.elRef.nativeElement.headerEl,
            markers: false,
            start: '100 top',
            end: 'bottom 10%',
            scrub: false,
            onEnter: () => this.updateLogoAndText(),
            onLeaveBack: () => this.resetLogoAndText(),
          },
        }
      );
    }
  }

  updateLogoAndText() {
    gsap.to('.logo', {
      duration: 0.6,
      scale: 0.7,
    });
  }
  resetLogoAndText() {
    gsap.to('.logo', {
      duration: 0.6,
      scale: 1,
    });
  }
}
