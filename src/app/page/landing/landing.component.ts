import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FirstPartComponent } from '../../components/first-part/first-part.component';
import { AboutMeComponent } from "../../components/about-me/about-me.component";
import { MyProjectsComponent } from 'src/app/components/my-projects/my-projects.component';
@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [HeaderComponent, FooterComponent, FirstPartComponent, AboutMeComponent, MyProjectsComponent],
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.scss',
})

export class LandingComponent implements OnInit {


  ngOnInit(): void {
    
  }
}
