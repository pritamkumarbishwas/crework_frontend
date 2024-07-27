import React from 'react';
import { Container, Box, Grid, Paper, Typography, Button } from '@mui/material';

const Dashboard = () => (
  <Container>
    <Box sx={{ my: 4 }}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6} lg={3}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6">To Do</Typography>
            <Button variant="contained">Add new</Button>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6} lg={3}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6">In Progress</Typography>
            <Button variant="contained">Add new</Button>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6} lg={3}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6">Under Review</Typography>
            <Button variant="contained">Add new</Button>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6} lg={3}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6">Finished</Typography>
            <Button variant="contained">Add new</Button>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  </Container>
);

export default Dashboard;
