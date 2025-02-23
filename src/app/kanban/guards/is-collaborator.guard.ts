import { inject } from '@angular/core';
import { ActivatedRoute, CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../../auth/services/auth.service';
import { ProjectCollaborators } from '../projects/interfaces/project-collaborators.interface';
import { ProjectService } from '../services/project.service';
import { User } from '../../auth/interfaces/user.interface';
import { map } from 'rxjs';

export const isCollaboratorGuard: CanActivateFn = (route, state) => {

  const authService = inject(AuthService);
  const router = inject(Router);
  const projectService = inject(ProjectService);

  const idProject = Number(route.paramMap.get('id'));

  return projectService.projectDetailCollaborators(idProject)
  .pipe(
    map((resp: ProjectCollaborators) => {

      // console.log(authService.currentUser());
      // console.log({resp});

      const currentUsername = authService.currentUser().username;

      //VALIDAR SI ES COLABORADOR O ES EL USUARIO QUE LO CREO PARA QUE PUEDA INGRESAR AL BOARD DEL PROYECTO
      const isCollaborator = (resp.collaborators?.some(coll => coll.username === currentUsername) || false) || resp.user_created.username === currentUsername;


      if(!isCollaborator){
        router.navigateByUrl('/cas-kanban/projects');
      }

      // console.log(isCollaborator);

      return isCollaborator;

    })
  )

};
