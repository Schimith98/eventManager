import axios from 'axios';
import React, {useEffect} from 'react';
import {events as eventsService} from '../../services/events';
import {Container, Title} from './style';

const Admin: React.FC = () => {
  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      // const response = await eventsService.getAll();
      // const response = await eventsService.delete(4);
    } catch (error) {
      console.log('Error /admin: (line 11):' + error);
    }
  };

  return (
    <Container>
      <Title>Admin Page</Title>
    </Container>
  );
};

export default Admin;
