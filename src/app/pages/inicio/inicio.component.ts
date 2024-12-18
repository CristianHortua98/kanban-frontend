import { Component, OnInit } from '@angular/core';
import Sortable from 'sortablejs';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.css',
})
export class InicioComponent implements OnInit {

  

  ngOnInit(): void {

    this.loadItems();

  }

  loadItems(){

    let el = document.querySelectorAll('.items-card');
    // console.log(el);

    el.forEach(element => {
      let sortable = Sortable.create(element as HTMLElement, {
        animation: 150,
        group: 'kanban',  // Define un grupo para permitir arrastre entre columnas
        // onMove: (evt, originalEvent) => {
        //   console.log({ originalEvent });
        //   console.log({ evt });
        //   this.updateTask();
        // }
        onEnd: (evt) => {
          console.log({ evt });
          this.updateTask();
        }
      });

    })

  }

  updateTask(){

    console.log('Update Task');

  }

}
