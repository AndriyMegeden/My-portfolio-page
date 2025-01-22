import { CommonModule, isPlatformBrowser } from '@angular/common';
import {
  AfterViewInit,
  Component,
  ElementRef,
  HostListener,
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


  marginRight: string = window.innerWidth <= 768 ? '40px' : '70px';
  // слухає подію прям звідси
  // Він прив'язує обробник події до елемента, на якому знаходиться компонент
  // коли змінюється розмір вікна метод onResize викликається 
  @HostListener('window:resize')
  onResize(): void {
    this.marginRight = window.innerWidth <= 768 ? '40px' : '70px';
    this.marginRight = window.innerWidth <= 576 ? '20px' : '40px';
  }


  ngAfterViewInit(): void {
    gsap.registerPlugin(ScrollTrigger);
    // перевірка, чи код виконується в браузері
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
          ease: "back.out(4)",
          stagger: { amount: 1 },
          x: -100,
          rotation: -15,
          duration: 1,
        })
        .from('.description', {
          ease: "back.out(4)",
          opacity: 0,
          y: 100,
          duration: 1,
        });
    }
  }
  
}
