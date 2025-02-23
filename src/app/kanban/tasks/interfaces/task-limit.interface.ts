import { TaskState } from "zone.js/lib/zone-impl";

export interface TaskLimit{

    id: number;
    title: string;
    description: string;
    status: TaskState;
    create_at: Date;
    update_at: Date;
    is_active: number;
    project_id: number;
    user_created: number;
    user_assigned: number;
    code: string;
    name: string;

}