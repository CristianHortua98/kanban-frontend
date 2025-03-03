import { Component, computed, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UploadsService } from '../../../services/uploads.service';
import { Task } from '../../interfaces/task.interface';
import { AuthService } from '../../../../auth/services/auth.service';
import { CommentsService } from '../../../services/comments.service';

declare var $: any;

@Component({
  selector: 'app-comment-field',
  templateUrl: './comment-field.component.html',
  styleUrl: './comment-field.component.css'
})
export class CommentFieldComponent implements OnInit{

  public commentForm: FormGroup;
  public formSubmitted = true;
  public userSession = computed(() => this.authService.currentUser());

  @Input() task: Task;

  constructor(
    private fb: FormBuilder,
    private uploadsService: UploadsService,
    private authService: AuthService,
    private commentsService: CommentsService
  ){}


  ngOnInit(): void {

    this.commentForm = this.fb.group({
      message: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(60000)]],
    });

    this.loadSummernote();

  }

  loadSummernote(): void {

    $('#summernote-comment').summernote({
      height: 100,
      toolbar: [
        ['style', ['style']],
        ['font', ['bold', 'underline', 'clear']],
        ['color', ['color']],
        ['para', ['ul', 'ol', 'paragraph']],
        ['table', ['table']],
        // ['insert', ['link', 'picture']]
      ],
      callbacks: {
        onImageUpload: (files) => {
          this.uploadImage(files);
        },
        onChange: (contents: string) => {
          this.commentForm.get('message').setValue(contents);
        }
      }
    });

    
  }

  resetSummernote(){

    $('#summernote-comment').summernote('reset');

  }

  uploadImage(files: any) {
    const data = new FormData();
    data.append('image', files[0]);

    this.uploadsService.uploadImage(data)
      .subscribe({
        next: (resp: any) => {
          // console.log(resp);
          let imageUrl = resp.url;
          $('#summernote-comment').summernote('insertImage', imageUrl);
        },
        error: (error) => {
          console.log(error);
        }
      })
  }


  addComment(){

    this.formSubmitted = true;

    if(this.commentForm.invalid){
      return;
    }

    this.commentsService.createComment({id_task: this.task.id, id_user: this.userSession().id, message: this.commentForm.get('message').value})
      .subscribe({
        next: (resp) => {
          this.commentsService.loadCommentTask(this.task.id);
          this.commentForm.reset();
          this.resetSummernote();
        }
      })


  }

}
