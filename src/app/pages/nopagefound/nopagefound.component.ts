import { Component } from '@angular/core';

@Component({
  selector: 'app-nopagefound',
  templateUrl: './nopagefound.component.html',
  styleUrl: './nopagefound.component.css'
})
export class NopagefoundComponent {

  year: number = new Date().getFullYear();

}
