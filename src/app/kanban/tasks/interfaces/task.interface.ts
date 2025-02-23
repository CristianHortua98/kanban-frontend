import { Project } from "../../projects/interfaces/project.interace";
import { User } from "../../../auth/interfaces/user.interface";

export interface Task{

    id: number;
    title: string;
    description: string;
    status: string;
    create_at: Date;
    update_at: Date;
    is_active: number;
    project_id: Project;
    user_created: User;
    user_assigned: User;

}