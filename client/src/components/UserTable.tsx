import React from 'react';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import { Button, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import { User, getUsers, deleteUser } from '../services/UserService';

interface UserTableProps {
    onEdit: (user: User) => void;
}

const UserTable: React.FC<UserTableProps> = ({ onEdit }) => {
    const queryClient = useQueryClient();

    const { data: users, isLoading } = useQuery('users', getUsers);

    const mutationDelete = useMutation((id: number) => deleteUser(id), {
        onSuccess: () => queryClient.invalidateQueries('users')
    });

    if (isLoading) return <p>Loading...</p>;

    const handleDelete = (id: number) => {
        mutationDelete.mutate(id);
    };

    return (
        <Table>
            <TableHead>
                <TableRow>
                    <TableCell>ID</TableCell>
                    <TableCell>Name</TableCell>
                    <TableCell>Email</TableCell>
                    <TableCell>Phone</TableCell>
                    <TableCell>Actions</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {users?.map((user) => (
                    <TableRow key={user.id}>
                        <TableCell>{user.id}</TableCell>
                        <TableCell>{user.name}</TableCell>
                        <TableCell>{user.email}</TableCell>
                        <TableCell>{user.profile.phone}</TableCell>
                        <TableCell>
                            <Button variant="contained" color="primary" onClick={() => onEdit(user)}>
                                Update
                            </Button>
                            <Button variant="contained" color="secondary" onClick={() => handleDelete(user.id)}>
                                Delete
                            </Button>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
};

export default UserTable;
