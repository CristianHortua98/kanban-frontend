import { User } from "../../../auth/interfaces/user.interface";
import { Task } from "./task.interface";

export interface Comment{

    id: number;
    message: string;
    create_at: Date;
    task: Task;
    user_created: User;
    is_active: number;

}