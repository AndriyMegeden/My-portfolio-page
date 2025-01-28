import { CommonModule, isPlatformBrowser } from '@angular/common';
import {
  Component,
  ElementRef,
  AfterViewInit,
  ViewChild,
  Inject,
  PLATFORM_ID,
} from '@angular/core';
import {
  aboutMeSettingsEn,
  aboutMeSettingsUk,
} from 'src/static/about-me.settings';
import { TranslateModule } from '@ngx-translate/core';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { TranslationService } from 'src/app/services/Translation.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent implements AfterViewInit {
  public isTrue: boolean = true;

  // отримуємо доступ до header по #headerEl
  @ViewChild('headerEl') headerEl!: ElementRef;

  constructor(
    private elRef: ElementRef,
    @Inject(PLATFORM_ID) private platformid: Object,
    private translationService: TranslationService
  ) {}
  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformid)) {
      // Перевірка, чи є значення в localStorag
      const storedLanguage = localStorage.getItem('language');
      if (storedLanguage) {
        this.isTrue = storedLanguage === 'en';
      }
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
    gsap.to('.change-language', {
      duration: 0.6,
      scale: 0.7,
    });
  }
  resetLogoAndText() {
    gsap.to('.change-language', {
      duration: 0.6,
      scale: 1,
    });
  }

  changeLanguage(lang: string): void {
    // Зберігаємо вибрану мову в localStorage
    localStorage.setItem('language', lang);
    this.translationService.changeLanguage(lang); // Зміна мови
    this.translationService.getAboutMeLetters().letters;
    console.log(this.translationService.getAboutMeLetters().letters);
    if (lang === 'uk') {
      this.isTrue = false;
    } else {
      this.isTrue = true;
    }
    
  }
}
