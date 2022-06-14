import React, {useState} from 'react';
import {
  Container,
  Row,
  Title,
  Text,
  CloseButton,
  Label,
  Input,
  SubmitButton,
} from './style';
import {RadioButton} from 'react-native-paper';
import {events as eventsService} from '../../services/events';
import {Formik} from 'formik';
import {IEvent, ITicket} from '../../interfaces/event';
import {Alert} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
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
        available: i < event.tickets.length ? event.tickets[i].available : true,
        buyerEmail: i < event.tickets.length ? event.tickets[i].buyerEmail : '',
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
      saveEvent(event);
    } catch (error) {
      console.log('Error /EventForm/onSubmit: ' + error);
    }
  };

  return (
    <Formik initialValues={initialValues} onSubmit={values => onSubmit(values)}>
      {({handleChange, handleBlur, handleSubmit, setFieldValue, values}) => (
        <Container>
          <Row>
            <Title>{event ? 'Editar evento' : 'Criar Evento'}</Title>
            <CloseButton onPress={() => toogleModalVisibility()}>
              <Icon name="closecircleo" size={32} color="red" />
            </CloseButton>
          </Row>
          <Input
            label="title"
            value={values.title}
            onChangeText={handleChange('title')}
          />
          <Label>Tipo:</Label>
          <Row>
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
                status={
                  values.type === 'universidades' ? 'checked' : 'unchecked'
                }
                onPress={() => setFieldValue('type', 'universidades')}
              />
              <Text>Universidades</Text>
            </Row>
          </Row>
          <Input
            label="Descrição"
            value={values.description}
            onChangeText={handleChange('description')}
          />
          <Input
            label="Data"
            value={values.date}
            onChangeText={handleChange('date')}
          />
          <Input
            label="Horário"
            value={values.hour}
            onChangeText={handleChange('hour')}
          />
          <Input
            label="Local"
            value={values.place}
            onChangeText={handleChange('place')}
          />
          <Input
            label="URL da imagem"
            value={values.imageURL}
            onChangeText={handleChange('imageURL')}
          />
          <Input
            label="Quantidade de ingressos"
            value={values.ticketsAmount.toString()}
            onChangeText={handleChange('ticketsAmount')}
          />

          <Input
            label="Valor do ingresso"
            value={values.ticketPrice.toString()}
            onChangeText={handleChange('ticketPrice')}
          />

          <SubmitButton mode="contained" onPress={() => handleSubmit()}>
            Submit
          </SubmitButton>
        </Container>
      )}
    </Formik>
  );
};

export default EventForm;
