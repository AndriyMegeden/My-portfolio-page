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
    { img: 'assets/slider/dog1.webp' },
    { img: 'assets/slider/dog2.webp' },
  ];

  public slideConfig = {
    slidesToShow: 1,
    slidesToScroll: 1,
    dots: true, // Додаємо точки навігації
    infinite: true,
    autoplay: true,
    autoplaySpeed: 2000,
    arrows: true, // Включаємо стрілки
    responsive: [
      {
        breakpoint: 1190,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 2,
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
