export interface CreateUserDTO {
    name: string;
    email: string;
    phone: string;
}

export interface UpdateUserDTO {
    name?: string;
    email?: string;
    phone?: string;
}
