import React from 'react'
import Typography from '@mui/material/Typography';
import MainCard from 'components/MainCard';
import MessList from './MessList';
import { Button } from '@mui/material';
import { PlusOutlined } from '@ant-design/icons';
import { Link, useNavigate } from 'react-router-dom';

const Messes = () => {
  const navigate = useNavigate()
  return (
    <MainCard title="" action={<Button variant='contained' onClick={()=>navigate('/messes/create')}><PlusOutlined/>{" "} Create</Button>}>
      <MessList/>
    </MainCard>
  )
}

export default Messes