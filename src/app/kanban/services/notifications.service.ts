import { computed, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environments } from '../../../environments/environments';
import { AddNotificationForm } from '../tasks/interfaces/add-notification-form.interface';
import { Notification } from '../tasks/interfaces/notifications.interface';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotificationsService {

  baseUrl = environments.baseUrl;

  private _notifications = signal<Notification[]>([]);

  public notifications = computed(() => this._notifications());


  constructor(

    private readonly http: HttpClient

  ){}

  loadNotificationsUser(id_user: number){

    const url = `${this.baseUrl}/notifications/${id_user}`;

    return this.http.get<Notification[]>(url).subscribe({
      next: (resp) => {
        this._notifications.set(resp);
      }
    })

  }


  createNotification(addNotification: AddNotificationForm){

    const url = `${this.baseUrl}/notifications`;

    return this.http.post(url, addNotification);

  }

  checkViewNotification(idNotification: number, idUser: number){

    const url = `${this.baseUrl}/notifications/${idNotification}`;

    return this.http.put(url, {})
      .subscribe({
        next: (resp) => {
          this.loadNotificationsUser(idUser);
        }
      })

  }

}
