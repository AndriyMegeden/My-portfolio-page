import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FirstPartComponent } from '../../components/first-part/first-part.component';
import { AboutMeComponent } from "../../components/about-me/about-me.component";
import { MyProjectsComponent } from 'src/app/components/my-projects/my-projects.component';
import { isPlatformBrowser } from '@angular/common';


@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [HeaderComponent, FooterComponent, FirstPartComponent, AboutMeComponent, MyProjectsComponent],
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.scss',
})

export class LandingComponent implements OnInit {


  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngOnInit(): void {
    // if (isPlatformBrowser(this.platformId)) {
    //   gsap.registerPlugin(ScrollTrigger);

    //   import('gsap-trial/ScrollSmoother').then(({ default: ScrollSmoother }) => {
    //     gsap.registerPlugin(ScrollSmoother);

    //     ScrollSmoother.create({
    //       wrapper: '.wrapper',
    //       content: '.content',
    //       smooth: 1.2,
    //       effects: true
    //     });
    //   }).catch((error) => {
    //     console.error('Помилка при завантаженні ScrollSmoother:', error);
    //   });
    // }
  }
}
