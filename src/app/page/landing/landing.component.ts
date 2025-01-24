import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { FooterComponent } from '../../components/footer/footer.component';
import { FirstPartComponent } from '../../components/first-part/first-part.component';
import { AboutMeComponent } from '../../components/about-me/about-me.component';
import { MyProjectsComponent } from 'src/app/components/my-projects/my-projects.component';
import { isPlatformBrowser } from '@angular/common';
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
    // if (isPlatformBrowser(this.platformId)) {
    // }
  }
}
