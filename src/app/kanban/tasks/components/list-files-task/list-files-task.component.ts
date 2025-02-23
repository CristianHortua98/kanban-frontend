import { AfterViewInit, Component, Input } from '@angular/core';
import { Task } from '../../interfaces/task.interface';

@Component({
  selector: 'kanban-list-files-task',
  templateUrl: './list-files-task.component.html',
  styleUrl: './list-files-task.component.css'
})
export class ListFilesTaskComponent{
  
  @Input() filesTask: string[];
  

}
