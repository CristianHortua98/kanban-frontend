import { Component, computed } from '@angular/core';
import { AuthService } from '../../auth/services/auth.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {

  public user = computed(() => this.authService.currentUser());
  public menu: any[] = [
    {
      "titulo": "Configuration",
      "icono": "mdi mdi-settings-box",
      "submenu": [
        { "titulo": "Users", "url": "users" },
      ],
      "visibleFor": ["COORDINADOR"]
    },
    {
      "titulo": "Projects",
      "icono": "mdi mdi-projector-screen",
      "submenu": [
        // { "titulo": "All Projects", "url": "all-projects" },
        // { "titulo": "Add Project", "url": "add-project" },
        { "titulo": "My Projects", "url": "projects" },
      ],
      "visibleFor": ["COORDINADOR","USUARIO"]
    },
  ]

  constructor(
    private readonly authService: AuthService
  ){

    // console.log(this.user());

  }

  get filteredMenu() {
    const userRoles = this.user().roles.map(role => role.name_rol);
    return this.menu.filter(item =>
      item.visibleFor.some(visibleRole => userRoles.includes(visibleRole))
    );
  }

  logout(){

    this.authService.logout();

  }


}
