import { Component, OnDestroy } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, ActivationEnd, Router } from '@angular/router';
import { filter, map, Subscription } from 'rxjs';

@Component({
  selector: 'app-breadcumbs',
  templateUrl: './breadcumbs.component.html',
  styleUrl: './breadcumbs.component.css'
})
export class BreadcumbsComponent{

  // public title: string = '';
  // public titleSubs$: Subscription;


  // constructor(

  //   private router: Router, 
  //   private route: ActivatedRoute

  // ){

  //   this.titleSubs$ = this.getArgumentsUrl()
  //     .subscribe(({title}) => {
  //       this.title = title;
  //       document.title = `Cas-Kanban - ${title}`;
  //     })

  // }


  // ngOnDestroy(): void {

  //   this.titleSubs$.unsubscribe();

  // }

  // getArgumentsUrl() {
  //   return this.router.events.pipe(
  //     filter((event): event is ActivationEnd => event instanceof ActivationEnd),
  //     map(event => this.getFinalRoute(event.snapshot))
  //   );
  // }
  
  // getFinalRoute(snapshot: ActivatedRouteSnapshot): any {
  //   // Recorre recursivamente hasta llegar al último hijo
  //   if (snapshot.firstChild) {
  //     return this.getFinalRoute(snapshot.firstChild);
  //   }
  //   return snapshot.data; // Devuelve los datos de la ruta final
  // }
  


}
