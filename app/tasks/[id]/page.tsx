"use client"
import axios from 'axios';
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import {stringify, parse} from 'qs'
import { Button, FormControl, InputLabel, MenuItem, Paper, Select, SelectChangeEvent, Stack, TextField, Typography } from '@mui/material';

const page = () => {

  const params = useParams<{ id: number }>(); // Specify parameter types
  const { id } = params; // Access the dynamic parameter 'id'
  const [task, setTask] = useState(null)

  const [estado, setEstado] = useState()
  
  useEffect(() => {
    let active = true
    fetchData()
    return () => {
      active = false
    }

    async function fetchData() {  
      const token = localStorage.getItem('access_token'); 
      
      let config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: `http://localhost:3000/tasks/${id}`,
        headers: { 
          'Authorization': `Bearer ${token}`
        }
      };

      axios.request(config)
      .then((response) => {
        console.log(JSON.stringify(response.data));
        setTask(response.data);
        setEstado(response.data.status);
      })
      .catch((error) => {
        console.log(error);
      });

    }
  }, [id])
  
  const handleChange = (event: SelectChangeEvent) => {
    setEstado(event.target.value as string);
  };

  return <>
  {task != null && 
    <Paper elevation={3} sx={{borderRadius:2, p:2}}>
      <Stack spacing={2}>
        <Typography variant="h4" color='#fff'>Create task</Typography>

        <Stack component='form' onSubmit={handleTaskCreate} sx={{ }} direction={'column'} spacing={2}>
          <TextField id="title" name='title' label="Title" variant="outlined" onChange={handleTitleChange} />
          <TextField id="description" name='description' label="Description" onChange={handleDescriptionChange} variant="outlined" multiline

          rows={4}/>
          
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Age</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={age}
              label="Age"
              onChange={handleChange}
            >
              <MenuItem value={'DONE'}>DONE</MenuItem>
              <MenuItem value={'IN_PROGRESS'}>IN_PROGRESS</MenuItem>
              <MenuItem value={'PENDING'}>PENDING</MenuItem>
            </Select>
          </FormControl>
          <Button type="submit" variant="contained">Contained</Button>
          {error && <p style={{ color: 'red' }}>{error}</p>}
        </Stack>
      </Stack>
    </Paper>
  
  }
    
  </>
    
  
}

export default page