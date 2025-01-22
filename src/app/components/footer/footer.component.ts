import { isPlatformBrowser } from '@angular/common';
import { AfterViewInit, Component, Inject, PLATFORM_ID } from '@angular/core';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss',
})
export class FooterComponent implements AfterViewInit {
  constructor(@Inject(PLATFORM_ID) private platformid: Object) {}
  openTg() {
    window.open('https://t.me/Andriyko_meged', '_blank');
  }
  scrollTop() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }

  ngAfterViewInit(): void {
    gsap.registerPlugin(ScrollTrigger);
    if (isPlatformBrowser(this.platformid)) {
      const tlForTg = gsap.timeline({
        scrollTrigger: {
          trigger: '.footer-wrap',
          start: 'top 65%',
          toggleActions: 'play none none none',
          markers: false,
        },
      });
      tlForTg.from('.telegram-container', {
        opacity: 0,
        y: 100,
      }).from(['.title-tg', '.contact-btn'], {
        opacity: 0,
        x: (index) => (index === 0 ? -100 : 100), // різні напрямки для стрілок
        duration: 1,
      });

      const tlForTop = gsap.timeline({
        scrollTrigger: {
          trigger: '.button-top',
          start: 'top 95%',
          toggleActions: 'play none none none',
          markers: false,
        },
      });
      tlForTop.from('.button-top', {
        opacity: 0,
      }).from(['.bottom-text', '.arrow-top'], {
        opacity: 0,
        x: (index) => (index === 0 ?  100 :  -100), // різні напрямки для стрілок
        duration: 1,
      });
    }
  }
  
  enter() {
    gsap.to('.button', {
      scale: 1.2,
      duration: 0.5,
      ease: 'power2.out',
    });
  }
  leave() {
    gsap.to('.button', {
      scale: 1,
      duration: 0.5,
      ease: 'power2.out',
    });
  }
}
