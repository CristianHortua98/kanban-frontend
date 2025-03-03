import { computed, Injectable } from '@angular/core';

import * as ExcelJS from 'exceljs';
import { saveAs } from 'file-saver';
import { TaskService } from './task.service';
import { DatePipe } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class ExcelService {

  public tasks = computed(() => this.taskService.tasks());

  constructor(
    private taskService: TaskService,
    private datePipe: DatePipe
  ){}

  formatDate(date: Date){

    return this.datePipe.transform(date, 'dd/MM/yyyy HH:mm') || 'Date Invalid';

  }


  async generateExcel(){

    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Reporte');

    worksheet.columns = [
      {header: 'ID', key: 'id', width: 10},
      {header: 'Project', key: 'project', width: 10},
      {header: 'Code', key: 'code', width: 10},
      {header: 'Title', key: 'title', width: 10},
      {header: 'Description', key: 'description', width: 10},
      {header: 'User Assigned', key: 'user_assigned', width: 10},
      {header: 'Create At', key: 'create_at', width: 10},
      {header: 'Update At', key: 'update_at', width: 10},
      {header: 'Status', key: 'status', width: 10},
    ];

    let data = [];

    for (const task of this.tasks()) {

      data.push(
        {
          id: task.id, 
          project: task.project_id.name, 
          code: task.project_id.code, 
          title: task.title, 
          description: task.description, 
          user_assigned: task.user_assigned?.fullname,
          create_at: this.formatDate(task.create_at), 
          update_at: this.formatDate(task.update_at), 
          status: task.status
        }
      )
      
    }

    data.forEach((row) => {
      worksheet.addRow(row);
    })

    const headerRow = worksheet.getRow(1);
    headerRow.font = { bold: true, color: { argb: 'FFFFFFFF' } };
    headerRow.fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: 'FF4F81BD' },
    };

    const buffer = await workbook.xlsx.writeBuffer();
    saveAs(new Blob([buffer]), 'Reporte.xlsx');
      
  }

}
