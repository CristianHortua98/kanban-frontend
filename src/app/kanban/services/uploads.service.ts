import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environments } from '../../../environments/environments';

@Injectable({
  providedIn: 'root'
})
export class UploadsService {

  baseUrl = environments.baseUrl;

  constructor(
    private http: HttpClient
  ){}

  uploadFiles(idTask: number, fileList: FileList){

    const filesArray = Array.from(fileList);

    const formData = new FormData();

    filesArray.forEach(file => {
      formData.append('files', file);
    })

    const url = `${this.baseUrl}/uploads/tasks-files/${idTask}`;

    return this.http.post(url, formData);

  }

  uploadImage(body: FormData){

    const url = `${this.baseUrl}/uploads/upload-image`;

    return this.http.post(url, body);

  }

}
