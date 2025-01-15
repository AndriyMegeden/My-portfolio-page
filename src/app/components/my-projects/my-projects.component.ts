import { CommonModule, isPlatformBrowser } from '@angular/common';
import { AfterViewInit, Component, Inject, PLATFORM_ID } from '@angular/core';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
@Component({
  selector: 'app-my-projects',
  standalone: true,
  imports: [SlickCarouselModule, CommonModule],
  templateUrl: './my-projects.component.html',
  styleUrls: ['./my-projects.component.scss'],
})
export class MyProjectsComponent implements AfterViewInit {

constructor(@Inject(PLATFORM_ID) private platformid: Object) {}


  slides = [
    { img: 'assets/slider/influencer.png' },
    { img: 'assets/slider/be-best.png' },
  ];

  public slideConfig = {
    slidesToShow: 1,
    slidesToScroll: 1,
    dots: false,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 2000,
    arrows: false, 
    responsive: [
      {
        breakpoint: 1190,
        settings: {
          slidesToShow: 1,
        },
      },
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  slickInit(event: any) {
    console.log('Slick initialized', event);
  }


  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformid)) {
      

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
