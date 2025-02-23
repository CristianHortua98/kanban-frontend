import { Component, computed, Input } from '@angular/core';
import { Project } from '../../interfaces/project.interace';
import { AuthService } from '../../../../auth/services/auth.service';
import { EncryptionServiceService } from '../../../../services/encryption-service.service';

@Component({
  selector: 'app-card-projects',
  templateUrl: './card-projects.component.html',
  styleUrl: './card-projects.component.css'
})
export class CardProjectsComponent {

  @Input() project: Project;

  public userSesion = computed(() => this.authService.currentUser());

  constructor(
    private authService:AuthService,
    private encryptionServiceService: EncryptionServiceService
  ){}

  getEncryptedId(id: number){
    return this.encryptionServiceService.encrypt(id.toString());
  }


}
