import { CommonModule, isPlatformBrowser } from '@angular/common';
import { AfterViewInit, Component, Inject, PLATFORM_ID } from '@angular/core';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { myProjectSettings } from 'src/static/my-projects.settings';
@Component({
  selector: 'app-my-projects',
  standalone: true,
  imports: [SlickCarouselModule, CommonModule],
  templateUrl: './my-projects.component.html',
  styleUrls: ['./my-projects.component.scss'],
})
export class MyProjectsComponent implements AfterViewInit {
  constructor(@Inject(PLATFORM_ID) private platformid: Object) {}

  // імпортуємо дані з файлу з настройками
  public slider = myProjectSettings.slider;

  public slideConfig = {
    slidesToShow: 1,
    slidesToScroll: 1,
    dots: false,
    infinite: true,
    autoplay: false,
    autoplaySpeed: 2000,
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
      })
        .from('.carousel', {
          opacity: 0,
          y: 50,
          duration: 0.5,
        })
        .from(['.prev-arrow', '.next-arrow'], {
          opacity: 0,
          x: (index) => (index === 0 ? -100 : 100), // різні напрямки для стрілок
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
