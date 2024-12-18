export interface User {
    id:        number;
    fullname:  string;
    document:  string;
    phone:     string;
    username:  string;
    email:     string;
    is_active: number;
    create_at: Date;
    roles:     Role[];
}

export interface Role {
    id:       number;
    name_rol: string;
}