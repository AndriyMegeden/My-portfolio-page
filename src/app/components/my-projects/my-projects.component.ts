import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { SlickCarouselModule } from 'ngx-slick-carousel';

@Component({
  selector: 'app-my-projects',
  standalone: true,
  imports: [SlickCarouselModule, CommonModule],
  templateUrl: './my-projects.component.html',
  styleUrls: ['./my-projects.component.scss'],
})
export class MyProjectsComponent {
  slides = [
    { img: 'assets/slider/influencer.png' },
    { img: 'assets/slider/be-best.png' },
  ];

  public slideConfig = {
    slidesToShow: 1,
    slidesToScroll: 1,
    dots: false, // Додаємо точки навігації
    infinite: true,
    autoplay: false,
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
}
