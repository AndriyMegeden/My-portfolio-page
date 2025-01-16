import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent {
  openTg() {
    window.open('https://t.me/Andriyko_meged', '_blank');
  }
  scrollTop() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth' 
    });
  }
  
}
