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
import { firstPartSettings } from 'src/static/first-part.settings';

@Component({
  selector: 'app-first-part',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './first-part.component.html',
  styleUrl: './first-part.component.scss',
})
export class FirstPartComponent implements AfterViewInit {
  constructor(@Inject(PLATFORM_ID) private platformid: Object) {}

  // імпортуємо дані з файлу з настройками
  files = firstPartSettings.files;
  logotypes = firstPartSettings.logotypes;

  @ViewChild('hover') hoverBTN!: ElementRef;

  navigateToGitHub() {
    window.open('https://github.com/AndriyMegeden?tab=repositories', '_blank');
  }

  ngAfterViewInit(): void {
    gsap.registerPlugin(ScrollTrigger);
    if (isPlatformBrowser(this.platformid)) {
      window.onbeforeunload = function () {
        window.scrollTo(0, 0);
      };
      gsap.from('.title, .subtitle', { opacity: 0, duration: 1, y: 45 });
      gsap.from('.git-logo', { opacity: 0, duration: 1 });
      gsap.from('.git-commit, .button', { duration: 1, y: 300 });


      gsap.timeline({
        scrollTrigger: {
          trigger: '.logotypes',
          start: 'bottom 99%',
          toggleActions: 'play none none none',
          markers: false,
        }
      }).from('.technology-text', {
        opacity: 0,
        y: 100,
        duration: 1,
        delay: 0,
      }).from('.img', {
        opacity: 0,
        y: -100,
        stagger: { amount: 1 },
        duration: 1,
      })
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
