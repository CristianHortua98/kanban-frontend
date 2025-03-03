import { AfterViewInit, Component, computed, OnInit } from '@angular/core';
import { ModalTaskService } from '../../../services/modal-task.service';
import { CKEditorCloudResult, loadCKEditorCloud } from '@ckeditor/ckeditor5-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { environments } from '../../../../../environments/environments';
import { UploadsService } from '../../../services/uploads.service';
import { TaskService } from '../../../services/task.service';
import { Task } from '../../interfaces/task.interface';
import { CommentsService } from '../../../services/comments.service';
import { DomSanitizer } from '@angular/platform-browser';

declare var $: any;

@Component({
  selector: 'app-modal-task',
  templateUrl: './modal-task.component.html',
  styleUrl: './modal-task.component.css'
})
export class ModalTaskComponent implements OnInit{
  
  baseUrl = environments.baseUrl;
  public taskForm: FormGroup;
  public selectedTask: Subscription;
  public formSubmitted = true;
  public filesTask: string[];
  public comments = computed(() => this.commentsService.commentsTask());
  
  constructor(
    private fb: FormBuilder,
    public modalTaskService: ModalTaskService,
    private uploadsService: UploadsService,
    private taskService: TaskService,
    private commentsService: CommentsService,
    private sanitizer: DomSanitizer
  ){}

  ngOnInit(): void {

    this.selectedTask = this.modalTaskService.selectedTask.subscribe(() => this.loadFormTask());

    this.taskForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(300)]],
      description: ['', [Validators.maxLength(60000)]],
      files: [null]
    });
  }

  loadFormTask() {
    const { title, description, id } = this.modalTaskService.currentTask;
    this.taskForm.patchValue({ title, description });
    this.loadSummernote();
    this.loadDropyfy();
    this.loadFilesTask(id);
    this.commentsService.loadCommentTask(id);

  }

  loadFilesTask(idTask: number){

    this.taskService.getUrlFilesTask(idTask)
      .subscribe({
        next: (resp: string[]) => {
          this.filesTask = resp;
        }
      })

  }

  loadSummernote(): void {

    $('#summernote').summernote({
      height: 300,
      toolbar: [
        ['style', ['style']],
        ['font', ['bold', 'underline', 'clear']],
        ['color', ['color']],
        ['para', ['ul', 'ol', 'paragraph']],
        ['table', ['table']],
        ['insert', ['link', 'picture']]
      ],
      callbacks: {
        onImageUpload: (files) => {
          this.uploadImage(files);
        },
        onChange: (contents: string) => {
          this.taskForm.get('description').setValue(contents);
        }
      }
    });

    $('#summernote').summernote('code', this.modalTaskService.currentTask?.description);

    
  }
  
  loadDropyfy(){
    
    $('.dropify').dropify();
    
  }
  
  clearFiles() {
    // $('.dropify').dropify('reset');
    // $('.dropify').dropify('clear');
    $('.dropify-clear').click();
  }

  uploadImage(files: any) {
    const data = new FormData();
    data.append('image', files[0]);

    this.uploadsService.uploadImage(data)
      .subscribe({
        next: (resp: any) => {
          // console.log(resp);
          let imageUrl = resp.url;
          $('#summernote').summernote('insertImage', imageUrl);
        },
        error: (error) => {
          console.log(error);
        }
      })
  }


  onFileChange(event: any){

    if (event.target.files.length > 0) {
      const files = event.target.files;
      this.taskForm.patchValue({files: files})
    }

  }

  closeModal() {
    this.modalTaskService.closeModal();
  }

  uploadFilesTask(idTask: number){

    if(this.taskForm.get('files').value){
      this.uploadsService.uploadFiles(idTask, this.taskForm.get('files').value)
      .subscribe({
        next: (resp) => {
          this.taskForm.reset();
          this.clearFiles();
        }
      })
    }

  }

  changeTask() {

    const idTask = this.modalTaskService.currentTask.id;

    this.formSubmitted = true;

    if(this.taskForm.invalid){
      return;
    }

    // console.log(this.taskForm.get('files').value);

    // console.log(this.taskForm.value);

    this.taskService.updateTask(idTask, this.taskForm.value)
      .subscribe({
        next: (resp: Task) => {
          // console.log(resp);
          this.uploadFilesTask(idTask);
          this.taskService.updTaskEmit.emit(resp.title);
          this.closeModal();
        },
        error: (err) => {
          console.log(err);
        }
      })

  }

  sanitizeHtml(content: string){
    return this.sanitizer.bypassSecurityTrustHtml(content);
  }


}
