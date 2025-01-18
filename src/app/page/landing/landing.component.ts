import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { FooterComponent } from '../../components/footer/footer.component';
import { gsap } from 'gsap';
import { FirstPartComponent } from '../../components/first-part/first-part.component';
import { AboutMeComponent } from '../../components/about-me/about-me.component';
import { MyProjectsComponent } from 'src/app/components/my-projects/my-projects.component';
import { isPlatformBrowser } from '@angular/common';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { HeaderComponent } from 'src/app/components/header/header.component';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [
    HeaderComponent,
    FooterComponent,
    FirstPartComponent,
    AboutMeComponent,
    MyProjectsComponent,
  ],
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.scss',
})
export class LandingComponent implements OnInit {
  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      gsap.registerPlugin(ScrollTrigger);

      this.smoothScroll('.content', '.wrapper', 1);
    }
  }

  smoothScroll(
    contentSelector: string,
    wrapperSelector: string,
    smoothness: number
  ): void {
    const content = document.querySelector(contentSelector) as HTMLElement;
    const wrapper = document.querySelector(wrapperSelector) as HTMLElement;

    if (!content || !wrapper) {
      console.error('Content or wrapper element not found');
      return;
    }

    gsap.set(wrapper, {
      overflow: 'hidden',
      position: 'fixed',
      height: '100%',
      width: '100%',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
    });

    gsap.set(content, { overflow: 'visible', width: '100%' });

    let height: number;
    const getProp = gsap.getProperty(content);
    const setProp = gsap.quickSetter(content, 'y', 'px');
    const setScroll = ScrollTrigger.getScrollFunc(window);

    const refreshHeight = () => {
      height = content.clientHeight;
      document.body.style.height = `${height}px`;
      return height - document.documentElement.clientHeight;
    };

    ScrollTrigger.addEventListener('refresh', () => {
      content.style.overflow = 'visible';
    });
    ScrollTrigger.defaults({ scroller: content });

    ScrollTrigger.scrollerProxy(content, {
      scrollTop(value) {
        if (arguments.length && value !== undefined) {
          setProp(-value);
          setScroll(value);
        }
        return -getProp('y') as number;
      },
      scrollHeight: () => document.body.scrollHeight,
      getBoundingClientRect: () => ({
        top: 0,
        left: 0,
        width: window.innerWidth,
        height: window.innerHeight,
      }),
    });

    ScrollTrigger.create({
      animation: gsap.fromTo(
        content,
        { y: 0 },
        {
          y: () => document.documentElement.clientHeight - height,
          ease: 'none',
        }
      ),
      scroller: window,
      start: 0,
      end: refreshHeight,
      scrub: smoothness,
    });
  }
}
