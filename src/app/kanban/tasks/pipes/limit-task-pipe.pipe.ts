import { Pipe, PipeTransform } from '@angular/core';
import { Task } from '../interfaces/task.interface';

@Pipe({
  name: 'limitTaskPipe'
})
export class LimitTaskPipePipe implements PipeTransform {

  transform(tasks: Task[], status: string): unknown {
    
    if(status === 'DONE'){

      return tasks.filter(task => task.status === 'DONE').slice(0, 10);

    }
    
    return tasks.filter(task => task.status === status);

  }

}
