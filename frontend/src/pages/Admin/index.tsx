import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {events as eventsService} from '../../services/events';
import {Container, PlusButton, TableContainer, Text, Title} from './style';
import {DataTable} from 'react-native-paper';
import {IEvent} from '../../interfaces/event';
import Icon from 'react-native-vector-icons/AntDesign';
import {Alert, TouchableOpacity, View} from 'react-native';
import Loading from '../../components/Loading';
import Modal from 'react-native-modal';
import EventForm from '../../components/EventForm';

const Admin: React.FC = () => {
  const [eventList, setEventList] = useState<IEvent[] | undefined>(undefined);
  const [loading, setLoading] = useState<boolean>(false);
  const [isModalVisible, setModalVisible] = useState<boolean>(false);
  const toogleModalVisibility = () => setModalVisible(!isModalVisible);
  const [selectedEvent, setSelectedEvent] = useState<IEvent | undefined>(
    undefined,
  );

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      setLoading(true);
      const response = await eventsService.getAll();
      const eventList = response.data;
      setEventList(eventList);
    } catch (error) {
      console.log('Error /admin/getData(): ' + error);
    }
    setLoading(false);
  };

  const countTicketsAvailables = async tickets => {
    const ticketsAvailable = await tickets.filter(t => t.available);
    return ticketsAvailable.length();
  };

  const showDeleteAlert = id =>
    Alert.alert(
      'Confirmar deleção',
      'My Alert Msg',
      [
        {
          text: 'Cancel',
          onPress: () => {},
          style: 'cancel',
        },
        {
          text: 'Deletar',
          onPress: () => deleteEvent(id),
          style: 'cancel',
        },
      ],
      {
        cancelable: true,
        onDismiss: () =>
          Alert.alert(
            'This alert was dismissed by tapping outside of the alert dialog.',
          ),
      },
    );

  const deleteEvent = async id => {
    try {
      const response = await eventsService.delete(id);
      if (response.status === 200) {
        Alert.alert('Evento Excluído com Sucesso');
        getData();
      }
    } catch (error) {
      Alert.alert('Erro ao excluir evento.');
      console.log('Error /admin/deleteEvent(): ' + error);
    }
  };

  const openEditModal = event => {
    setSelectedEvent(event);
    toogleModalVisibility();
  };

  return (
    <>
      <Container>
        <Title>Gerenciar eventos</Title>

        <PlusButton onPress={toogleModalVisibility}>
          <Icon name="pluscircleo" size={18} color="green" />
          <Text> </Text>
          <Text>Criar evento</Text>
        </PlusButton>

        <TableContainer>
          {loading ? (
            <Loading />
          ) : (
            eventList && (
              <DataTable>
                <DataTable.Header>
                  <DataTable.Title>Título</DataTable.Title>
                  <DataTable.Title numeric>Editar</DataTable.Title>
                  <DataTable.Title numeric>Deletar</DataTable.Title>
                </DataTable.Header>

                {eventList.map((event, i) => (
                  <DataTable.Row key={i * 7}>
                    <DataTable.Cell>{event.title}</DataTable.Cell>
                    <DataTable.Cell numeric>
                      <TouchableOpacity onPress={() => openEditModal(event)}>
                        <Icon name="edit" size={25} color="black" />
                      </TouchableOpacity>
                    </DataTable.Cell>
                    <DataTable.Cell numeric>
                      <TouchableOpacity
                        onPress={() => showDeleteAlert(event.id)}>
                        <Icon name="delete" size={25} color="red" />
                      </TouchableOpacity>
                    </DataTable.Cell>
                  </DataTable.Row>
                ))}
              </DataTable>
            )
          )}
        </TableContainer>
      </Container>

      <Modal isVisible={isModalVisible}>
        <EventForm
          event={selectedEvent}
          toogleModalVisibility={toogleModalVisibility}
          updateList={getData}
        />
      </Modal>
    </>
  );
};

export default Admin;
