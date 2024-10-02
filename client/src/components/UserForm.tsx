import React, { useEffect } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { useForm } from 'react-hook-form';
import { Button, TextField } from '@mui/material';
import { CreateUserDTO, updateUser, createUser, User } from '../services/UserService';


interface UserFormProps {
    user?: User | null;
    onSuccess: () => void;
}

const UserForm: React.FC<UserFormProps> = ({ user, onSuccess }) => {
    const { register, handleSubmit, reset } = useForm<CreateUserDTO>();

    const queryClient = useQueryClient();

    const mutationCreate = useMutation(createUser, {
        onSuccess: () => {
            queryClient.invalidateQueries('users');
            onSuccess();
        }
    });

    const mutationUpdate = useMutation((data: CreateUserDTO) => updateUser(user!.id, data), {
        onSuccess: () => {
            queryClient.invalidateQueries('users');
            onSuccess();
        }
    });

    useEffect(() => {
        if (user) {
            reset({ name: user.name, email: user.email, phone: user.profile.phone });
        } else {
            reset({ name: '', email: '', phone: '' });
        }
    }, [user, reset]);

    const onSubmit = (data: CreateUserDTO) => {
        if (user) {
            mutationUpdate.mutate(data);
        } else {
            mutationCreate.mutate(data);
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <TextField label="Name" {...register('name', { required: true })} fullWidth margin="normal" />
            <TextField label="Email" {...register('email', { required: true })} fullWidth margin="normal" />
            <TextField label="Phone" {...register('phone', { required: true })} fullWidth margin="normal" />
            <Button type="submit" variant="contained" color="primary">
                {user ? 'Update' : 'Create'} User
            </Button>
        </form>
    );
};

export default UserForm;
