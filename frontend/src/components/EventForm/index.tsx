import React, {useState} from 'react';
import {Container, Row, Title, Text} from './style';
import {RadioButton, TextInput, Button} from 'react-native-paper';
import {events as eventsService} from '../../services/events';
import {Formik} from 'formik';
import {IEvent, ITicket} from '../../interfaces/event';
import {Alert} from 'react-native';

interface IEventForm {
  id: number | null;
  type: string;
  title: string;
  description: string;
  date: string;
  hour: string;
  place: string;
  imageURL: string;
  ticketsAmount: number;
  ticketPrice: number;
}

const EventForm = ({event, toogleModalVisibility, updateList}) => {
  const initialValues: IEventForm = {
    id: event ? event.id : null,
    type: event ? event.type : 'empresas',
    title: event ? event.title : '',
    description: event ? event.description : '',
    date: event ? event.date : '',
    hour: event ? event.hour : '',
    place: event ? event.place : '',
    imageURL: event ? event.imageURL : '',
    ticketsAmount: event ? event.tickets.length : 1,
    ticketPrice: event ? event.tickets[0].price : 100,
  };

  const mountObject = async obj => {
    const ticketsArray: ITicket[] = [];
    for (let i = 0; i < obj.ticketsAmount; i++) {
      ticketsArray.push({
        id: i + 1,
        price: parseFloat(obj.ticketPrice),
        // available: event ? event.tickets[i].available : true,
        available: true,
      });
    }

    const newObj: IEvent = {
      id: obj.id || null,
      type: obj.type || 'empresas',
      title: obj.title || '',
      description: obj.description || '',
      date: obj.date || '',
      hour: obj.hour || '',
      place: obj.place || '',
      imageURL: obj.imageURL || '',
      tickets: ticketsArray,
    };

    return newObj;
  };

  const saveEvent = async (obj: IEvent) => {
    try {
      const response = await eventsService.save(obj);
      // console.log(response);
      Alert.alert('Evento salvo com sucesso');
      toogleModalVisibility();
      updateList();
    } catch (error) {
      console.log('Error /admin/saveEvent: ' + error);
      Alert.alert('Error');
    }
  };

  const onSubmit = async obj => {
    try {
      const event: IEvent = await mountObject(obj);
      console.log(event);
      saveEvent(event);
    } catch (error) {
      console.log('Error /EventForm/onSubmit: ' + error);
    }
  };

  return (
    <Formik initialValues={initialValues} onSubmit={values => onSubmit(values)}>
      {({handleChange, handleBlur, handleSubmit, setFieldValue, values}) => (
        <Container>
          <Title>{event ? 'Editar evento' : 'Criar Evento'}</Title>
          <TextInput
            label="title"
            value={values.title}
            onChangeText={handleChange('title')}
          />
          <Text>Tipo:</Text>
          <Row>
            <RadioButton
              value={values.type}
              status={values.type === 'empresas' ? 'checked' : 'unchecked'}
              onPress={() => setFieldValue('type', 'empresas')}
            />
            <Text>Empresas</Text>
          </Row>
          <Row>
            <RadioButton
              value={values.type}
              status={values.type === 'universidades' ? 'checked' : 'unchecked'}
              onPress={() => setFieldValue('type', 'universidades')}
            />
            <Text>Universidades</Text>
          </Row>
          <TextInput
            label="Descrição"
            value={values.description}
            onChangeText={handleChange('description')}
          />
          <TextInput
            label="Data"
            value={values.date}
            onChangeText={handleChange('date')}
          />
          <TextInput
            label="Horário"
            value={values.hour}
            onChangeText={handleChange('hour')}
          />
          <TextInput
            label="Local"
            value={values.place}
            onChangeText={handleChange('place')}
          />
          <TextInput
            label="URL da imagem"
            value={values.imageURL}
            onChangeText={handleChange('imageURL')}
          />
          <TextInput
            label="Quantidade de ingressos"
            value={values.ticketsAmount.toString()}
            onChangeText={handleChange('ticketsAmount')}
          />

          <TextInput
            label="Valor do ingresso"
            value={values.ticketPrice.toString()}
            onChangeText={handleChange('ticketPrice')}
          />

          <Button mode="contained" onPress={() => handleSubmit()}>
            Submit
          </Button>
        </Container>
      )}
    </Formik>
  );
};

export default EventForm;
