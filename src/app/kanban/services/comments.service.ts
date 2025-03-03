import { HttpClient } from '@angular/common/http';
import { computed, Injectable, signal } from '@angular/core';
import { Comment } from '../tasks/interfaces/comment.interface';
import { environments } from '../../../environments/environments';
import { CommentCreateForm } from '../tasks/interfaces/comment-create-form.interface';

@Injectable({
  providedIn: 'root'
})
export class CommentsService {

  baseUrl = environments.baseUrl;

  private _commentsTask = signal<Comment[]>([]);

  public commentsTask = computed(() => this._commentsTask());


  constructor(
    private http: HttpClient
  ){}

  createComment(commentCreateForm: CommentCreateForm){

    const url = `${this.baseUrl}/comments`;

    return this.http.post(url, commentCreateForm);

  }


  loadCommentTask(idTask: number){

    const url = `${this.baseUrl}/comments/all-comments-task/${idTask}`;

    return this.http.get(url)
      .subscribe({
        next: (resp: Comment[]) => {
          this._commentsTask.set(resp);
        }
      })

  }


}
