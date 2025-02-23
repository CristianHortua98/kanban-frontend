import { User } from "../../../auth/interfaces/user.interface";

export interface ProjectCollaborators{
    id:           number;
    name:         string;
    code:         string;
    create_at:    Date;
    is_active:    number;
    user_created: User;
    collaborators: User[];

}