export interface UserUpdateForm{

    id:        number;
    fullname:  string;
    document:  string;
    phone:     string;
    password:     string;
    password2:     string;
    username:  string;
    email:     string;
    is_active: number;
    create_at: Date;
    roles:     number[];

}