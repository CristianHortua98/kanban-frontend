import { Component, computed } from '@angular/core';
import { AuthService } from '../../auth/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {


  public user = computed(() => this.authService.currentUser());

  constructor(
    private authService: AuthService
  ){}


  logout(){

    this.authService.logout();

  }

}
