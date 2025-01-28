import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { isPlatformBrowser } from '@angular/common';
import { BehaviorSubject } from 'rxjs';
import {
  aboutMeSettingsEn,
  aboutMeSettingsUk,
} from 'src/static/about-me.settings';
import { ArrayLetters } from '@interfaces/about-me.interface';
@Injectable({
  providedIn: 'root',
})
export class TranslationService {
                                  
  private currentLanguageSubject = new BehaviorSubject<string>('en'); // Початкове значення
  currentLanguage$ = this.currentLanguageSubject.asObservable(); // Публічна Observable властивість

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private translateService: TranslateService
  ) {}

  /**
   * Ініціалізація мови за замовчуванням
   */
  initDefaultLanguage(): void {
    if (isPlatformBrowser(this.platformId)) {
      const defaultLanguage = localStorage.getItem('language') || 'en'; // 'en' - мова за замовчуванням
      this.translateService.setDefaultLang(defaultLanguage);
      this.translateService.use(defaultLanguage);
      this.currentLanguageSubject.next(defaultLanguage); // Оновлюємо поточну мову
    }
  }

  changeLanguage(lang: string): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('language', lang); // зберігаємо мову в localStorage
      this.translateService.use(lang); // змінюємо мову на вибрану
      this.currentLanguageSubject.next(lang); // Оновлюємо поточну мову
    }
  }

  getCurrentLanguage(): string {
    return this.translateService.currentLang;
  }

  getAboutMeLetters() {
    const currentLanguage = this.currentLanguageSubject.getValue();
    return currentLanguage === 'uk' ? aboutMeSettingsUk : aboutMeSettingsEn;
  }
}
