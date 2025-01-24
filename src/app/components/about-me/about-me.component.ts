import { CommonModule, isPlatformBrowser } from '@angular/common';
import {
  AfterViewInit,
  Component,
  ElementRef,
  HostListener,
  Inject,
  OnInit,
  PLATFORM_ID,
  ViewChild,
} from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { TranslationService } from 'src/app/services/Translation.service';
import { aboutMeSettings } from 'src/static/about-me.settings';

@Component({
  selector: 'app-about-me',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  templateUrl: './about-me.component.html',
  styleUrls: ['./about-me.component.scss'], // Виправлено імпорт стилів
})
export class AboutMeComponent implements AfterViewInit, OnInit {
  @ViewChild('wrap') wrap!: ElementRef;

  // Імпортуємо дані з файлу з настройками
  public letters = aboutMeSettings.letters;

  // Значення відступу праворуч
  marginRight: string = '';

  constructor(
    private elRef: ElementRef,
    @Inject(PLATFORM_ID) private platformid: Object,
    private translationService: TranslationService
  ) {
    // Виконується тільки в браузері
    if (isPlatformBrowser(this.platformid)) {
      this.updateMarginRight();
    }
  }

  @HostListener('window:resize')
  onResize(): void {
    // Виконується тільки в браузері
    if (isPlatformBrowser(this.platformid)) {
      this.updateMarginRight();
    }
  }

  ngOnInit(): void {
    // ініціалізуєм мову по дефолту 
    this.translationService.initDefaultLanguage();
  }

  ngAfterViewInit(): void {
    gsap.registerPlugin(ScrollTrigger);

    // Перевірка, чи код виконується в браузері
    if (isPlatformBrowser(this.platformid)) {
      gsap.from('.wrap', {
        opacity: 0,
        scrollTrigger: {
          trigger: this.elRef.nativeElement.wrap,
          markers: false,
          start: '1200px 80%',
        },
      });

      gsap.timeline({
        scrollTrigger: {
          trigger: '.wrap',
          markers: false,
          start: 'top 70%',
          toggleActions: 'play none none none',
        },
      })
        .from('.span', {
          opacity: 0,
          ease: 'back.out(4)',
          stagger: { amount: 1 },
          x: -100,
          rotation: -15,
          duration: 1,
        })
        .from('.description', {
          ease: 'back.out(4)',
          opacity: 0,
          y: 100,
          duration: 1,
        });
    }
  }

  // Оновлення значення marginRight залежно від ширини вікна
  private updateMarginRight(): void {
    if (window.innerWidth <= 576) {
      this.marginRight = '20px';
    } else if (window.innerWidth <= 768) {
      this.marginRight = '40px';
    } else {
      this.marginRight = '70px';
    }
  }
}
