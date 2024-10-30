"use client"
import ProtectedRoute from '@/components/ProtectedRoute'
import { Box, Button, Card, CardActions, CardContent, Container, IconButton, Paper, Stack, TextField, Typography } from '@mui/material'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Grid2 from '@mui/material/Grid2';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/useAuth'
import {stringify, parse} from 'qs'
import DeleteIcon from '@mui/icons-material/Delete';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import Link from 'next/link'

const allTasks = () => {

  const [tasks, setTasks] = useState([])
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();
  const {logout} = useAuth()
  const [refreshed, setRefreshed] = useState(false);

  useEffect(() => {
    let active = true
    fetchTasks()
    return () => {
      active = false
    }
    async function fetchTasks() {

      try {
        const token = localStorage.getItem('access_token'); 
        console.log(token);
        
        const response = await axios.get('http://localhost:3000/tasks', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log({response});
        
        if (active) {
          setTasks(response.data);
        }

      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    }
  }, [refreshed])

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  const handleDescriptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDescription(event.target.value);
  };


  const handleTaskCreate = async (event: React.FormEvent) => {
    event.preventDefault();
    setError('');

    const data = stringify({
      'title': title,
      'description': description 
    });
    
    const token = localStorage.getItem('access_token'); 

    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: 'http://localhost:3000/tasks',
      headers: {
        'Authorization': `Bearer ${token}`, 
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      data : data
    };

    axios.request(config)
    .then((response) => {
      console.log(JSON.stringify(response.data));
      setTitle('');
      setDescription('');

      setRefreshed(!refreshed);
      console.log('REFRESHED!');
      
    })
    .catch((error) => {
      console.log(error);
    });

  };

  const handleDone = (id:number) => {
    console.log("handleDone =>", id);
    
    let data = stringify({
      'status': 'DONE' 
    });
    const token = localStorage.getItem('access_token'); 

    let config = {
      method: 'put',
      maxBodyLength: Infinity,
      url: `http://localhost:3000/tasks/${id}`,
      headers: { 
        'Authorization': `Bearer ${token}`, 
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      data : data
    };

    axios.request(config)
    .then((response) => {
      console.log(JSON.stringify(response.data));
      setRefreshed(!refreshed)
    })
    .catch((error) => {
      console.log(error);
    });

  }
  const handleEdit = (id:number) => {
    console.log("handleEdit =>", id);

    router.push(`/tasks/${id}`);
    
  }
  const handleDelete = (id:number) => {
    console.log("handleDele =>", id);
    const token = localStorage.getItem('access_token'); 

    let config = {
      method: 'delete',
      maxBodyLength: Infinity,
      url: `http://localhost:3000/tasks/${id}`,
      headers: { 
        'Authorization': `Bearer ${token}`
      }
    };

    axios.request(config)
    .then((response) => {
      console.log(JSON.stringify(response.data));
      setRefreshed(!refreshed)
    })
    .catch((error) => {
      console.log(error);
    });


  }

  const handleLogout = () => {
    logout();
    router.push('/');
  }

  return (
    <ProtectedRoute>
      <Container>
        <Grid2 container spacing={2}>
          <Grid2 size={{ lg: 12 }}>
            <Button variant="contained" color='error' onClick={handleLogout}>LOGOUT</Button>
          </Grid2>
          <Grid2 size={{ lg: 12 }}>
            <Paper elevation={3} sx={{borderRadius:2, p:2}}>
              <Stack spacing={2}>
                <Typography variant="h4" color='#fff'>Create task</Typography>

                <Stack component='form' onSubmit={handleTaskCreate} sx={{ }} direction={'column'} spacing={2}>
                  <TextField id="title" name='title' label="Title" variant="outlined" onChange={handleTitleChange} />
                  <TextField id="description" name='description' label="Description" onChange={handleDescriptionChange} variant="outlined" multiline
                  rows={4}/>
                  
                  {/* <div>
                    <label htmlFor="title">Title:</label>
                    <input
                      type="title"
                      id="title"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      required
                    />
                  </div> */}
                  <Button type="submit" variant="contained">Contained</Button>
                  {error && <p style={{ color: 'red' }}>{error}</p>}
                </Stack>
              </Stack>
            </Paper>
          </Grid2>
          {  
            (tasks) && 
              tasks.map(task => (
              <Grid2 key={task.id} size={{ lg: 3 }}>
                <Card sx={{ minWidth: 275 }}>
                  <CardContent>
                    <Typography gutterBottom sx={{ color: 'text.secondary', fontSize: 14 }}>
                      {task.title}
                    </Typography>
                    <Typography variant="body2">
                      {task.description}
                    </Typography>
                    <Typography variant="h5" component="div">
                      {task.status}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <IconButton aria-label="done" size="large" color='primary' onClick={() => {handleDone(task.id) }}>
                      <CheckCircleIcon fontSize="inherit" />
                    </IconButton>
                    <IconButton aria-label="edit" size="large" color='white' onClick={() => {handleEdit(task.id)} }>
                      <ModeEditIcon fontSize="inherit" />
                    </IconButton>
                    <IconButton aria-label="delete" size="large" color='error' onClick={() => {handleDelete(task.id)} }>
                      <DeleteIcon fontSize="inherit" />
                    </IconButton>
                  </CardActions>
                </Card>
              </Grid2>
            ))
          }
        </Grid2>
      </Container>
    </ProtectedRoute>
  )
}

export default allTasks