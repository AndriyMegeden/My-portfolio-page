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
  private currentLanguageSubject = new BehaviorSubject<string>('uk'); // Початкове значення
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
      const defaultLanguage = localStorage.getItem('language') || 'uk'; // 'uk' - мова за замовчуванням
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

  // Заміна методу на використання даних з aboutMeSettings
  public getAboutMeLetters(): ArrayLetters {
    const currentLanguage = this.getCurrentLanguage();

    // Вибір відповідних літер в залежності від мови
    if (currentLanguage === 'en') {
      return aboutMeSettingsEn; // Використовуємо 'aboutMeSettings' для англійської
    } else if (currentLanguage === 'uk') {
      return aboutMeSettingsUk;
    }
    return aboutMeSettingsEn; // Якщо мова не знайдена, повертаємо за замовчуванням
  }
}
