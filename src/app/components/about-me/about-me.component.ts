import { CommonModule, isPlatformBrowser } from '@angular/common';
import {
  AfterViewInit,
  Component,
  ElementRef,
  Inject,
  PLATFORM_ID,
  ViewChild,
} from '@angular/core';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { aboutMeSettings } from 'src/static/about-me.settings';
@Component({
  selector: 'app-about-me',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './about-me.component.html',
  styleUrl: './about-me.component.scss',
})
export class AboutMeComponent implements AfterViewInit {
  @ViewChild('wrap') wrap!: ElementRef;

 // імпортуємо дані з файлу з настройками
 public letters = aboutMeSettings.letters;



  constructor(
    private elRef: ElementRef,
    @Inject(PLATFORM_ID) private platformid: Object
  ) {}

  ngAfterViewInit(): void {
    gsap.registerPlugin(ScrollTrigger);
    // іде перевірка чи код виконується в браузері
    if (isPlatformBrowser(this.platformid)) {
      gsap.from('.wrap', {
        opacity: 0,
        scrollTrigger: {
          trigger: this.elRef.nativeElement.wrap,
          markers: false,
          start: '1200px 80%',
        },
      }),
        gsap.from('.span', {
          ease: "back.out(7)",
          opacity: 0,
          stagger: { amount: 1 },
          x: -100,
          rotation: -15,
          duration: 1,
          scrollTrigger: {
            trigger: '.wrap',
            start: 'top 70%',
            toggleActions: 'play none none none',
            markers: false,
          },
        });
      gsap.from('.description', {
        ease: "back.out(7)",
        opacity: 0,
        y: 100,
        duration: 2,
        scrollTrigger: {
          trigger: '.wrap',
          toggleActions: 'play none none none',
          start: '400px 70%',
          markers: false,
        },
      });
    }
  }

 
}
