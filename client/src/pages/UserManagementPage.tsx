import React, { useState } from 'react';
import { Container, Grid, Typography } from '@mui/material';
import { User } from '../services/UserService';
import UserTable from '../components/UserTable';

const UserManagementPage: React.FC = () => {
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const handleEditUser = (user: User) => {
    setSelectedUser(user);
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        User Management
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <UserTable onEdit={handleEditUser} />
        </Grid>
      </Grid>
    </Container>
  );
};

export default UserManagementPage;
