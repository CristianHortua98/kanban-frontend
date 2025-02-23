import { User } from "../../../auth/interfaces/user.interface";
import { Task } from "./task.interface";

export interface Notification{

    id: number;
    active: number;
    id_task: Task;
    id_user: User;
    create_at: Date;

}