import { CommonModule, isPlatformBrowser } from '@angular/common';
import {
  AfterViewInit,
  Component,
  Inject,
  OnDestroy,
  PLATFORM_ID,
} from '@angular/core';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { myProjectSettings } from 'src/static/my-projects.settings';
import { Subscription } from 'rxjs';
import { DeviceService } from 'src/app/services/device.service';
import { TranslationService } from 'src/app/services/Translation.service';
import { TranslateModule } from '@ngx-translate/core';
@Component({
  selector: 'app-my-projects',
  standalone: true,
  imports: [SlickCarouselModule, CommonModule, TranslateModule],
  templateUrl: './my-projects.component.html',
  styleUrls: ['./my-projects.component.scss'],
})
export class MyProjectsComponent implements AfterViewInit, OnDestroy {
  constructor(
    @Inject(PLATFORM_ID) private platformid: Object,
    private isDevice: DeviceService,
    private translationService: TranslationService
  ) {}

  // імпортуємо дані з файлу з настройками
  public slider = myProjectSettings.slider;
  private subscription: Subscription | null = null;
  public isMobile = false;
  // конфіг до слайдера
  public slideConfig = {
    slidesToShow: 1,
    slidesToScroll: 1,
    dots: false,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: false,
    // responsive: [
    //   {
    //     breakpoint: 1190,
    //     settings: {
    //       slidesToShow: 1,
    //     },
    //   },
    // ],
  };

  slickInit(event: any) {
    console.log('Slick initialized', event);
  }
  // перехід до проектів
  navigateToProject(link?: string): void {
    if (link) {
      window.open(link, '_blank'); // Відкриє посилання в новій вкладці
    } else {
      console.log('Link is not available');
    }
  }

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformid)) {
      // провірка на мобільні пристрої
      this.subscription = this.isDevice.isMobile$.subscribe((isMobile) => {
        this.isMobile = isMobile;
      });

      gsap.from('.explore', {
        opacity: 0,
        y: 45,
        duration: 1,
        scrollTrigger: {
          trigger: '.explore',
          start: 'top 80%',
          toggleActions: 'play none none none',
          markers: false,
        },
      });
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: '.slider',
          start: 'top 75%',
          toggleActions: 'play none none none',
          markers: false,
        },
      });

      tl.from('.carousel-contaner', {
        opacity: 0,
        y: 100,
        duration: 1,
      }).from(['.prev-arrow', '.next-arrow'], {
        opacity: 0,
        x: (index) => (index === 0 ? 100 : -100), // різні напрямки для стрілок
        duration: 1,
      });
    }
  }

  // відписуємось
  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
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
