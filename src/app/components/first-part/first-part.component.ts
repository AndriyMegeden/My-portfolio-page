import { CommonModule, isPlatformBrowser } from '@angular/common';
import {
  AfterViewInit,
  Component,
  ElementRef,
  HostListener,
  inject,
  Inject,
  OnDestroy,
  OnInit,
  PLATFORM_ID,
  ViewChild,
} from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Subscription } from 'rxjs';
import { DeviceService } from 'src/app/services/device.service';
import { TranslationService } from 'src/app/services/Translation.service';


import { firstPartSettings } from 'src/static/first-part.settings';

@Component({
  selector: 'app-first-part',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  templateUrl: './first-part.component.html',
  styleUrl: './first-part.component.scss',
})
export class FirstPartComponent implements AfterViewInit, OnDestroy, OnInit {
  // імпортуємо дані з файлу з настройками
  public files = firstPartSettings.files;
  public logotypes = firstPartSettings.logotypes;

  public isMobile = false;
  private subscription: Subscription | null = null;
  @ViewChild('hover') hoverBTN!: ElementRef;

  constructor(
    @Inject(PLATFORM_ID) private platformid: Object,
    private isDevice: DeviceService,
    private translationService: TranslationService
  ) {}



  // навігація на іншу сторінку
  navigateToGitHub(event: MouseEvent) {
    event.preventDefault();
    window.open('https://github.com/AndriyMegeden?tab=repositories', '_blank');
  }

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformid)) {
      // провірка на мобільні пристрої
      this.subscription = this.isDevice.isMobile$.subscribe((isMobile) => {
        this.isMobile = isMobile;
      });
      // перед ініцалізацією вертає прокрутку на верх
      window.onbeforeunload = function () {
        window.scrollTo(0, 0);
      };

      // gsap
      gsap.registerPlugin(ScrollTrigger);
      gsap.from('.title, .subtitle', { opacity: 0, duration: 1, y: 45 });
      gsap.from('.git-logo', { opacity: 0, duration: 1 });
      gsap.from('.git-commit, .button', { duration: 1, y: 300 });

      gsap
        .timeline({
          scrollTrigger: {
            trigger: '.logotypes',
            start: 'bottom 99%',
            toggleActions: 'play none none none',
            markers: false,
          },
        })
        .from('.technology-text', {
          opacity: 0,
          y: 100,
          duration: 1,
          delay: 0,
        })
        .from('.img', {
          opacity: 0,
          y: -100,
          stagger: { amount: 1 },
          duration: 1,
        });
    }
  }

  ngOnInit(): void {
    // ініціалізуєм мову по дефолту 
    this.translationService.initDefaultLanguage();
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
