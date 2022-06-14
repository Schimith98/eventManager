import React, {useEffect, useState} from 'react';
import {events as eventsService} from '../../services/events';
import {
  Container,
  IconButton,
  PlusButton,
  TableContainer,
  Text,
  Title,
} from './style';
import {DataTable} from 'react-native-paper';
import {IEvent} from '../../interfaces/event';
import Icon from 'react-native-vector-icons/AntDesign';
import {Alert} from 'react-native';
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

  const showDeleteAlert = id =>
    Alert.alert(
      'Deletar',
      'Você realmente deseja excluir o evento?',
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

  const showTickets = (event: IEvent) => {
    let ticketsUnavailable = 0;
    for (let i = 0; i < event.tickets.length; i++) {
      if (!event.tickets[i].available) {
        ticketsUnavailable = ticketsUnavailable + 1;
      }
    }
    Alert.alert(
      `Ingressos vendidos:${ticketsUnavailable}/${event.tickets.length}`,
    );
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
                  <DataTable.Title> </DataTable.Title>
                </DataTable.Header>

                {eventList.map((event, i) => (
                  <DataTable.Row key={i * 7}>
                    <DataTable.Cell>{event.title}</DataTable.Cell>
                    <DataTable.Cell numeric>
                      <IconButton onPress={() => showTickets(event)}>
                        <Icon name="eye" size={25} color="black" />
                      </IconButton>
                      <Text>{'      '}</Text>
                      <IconButton onPress={() => openEditModal(event)}>
                        <Icon name="edit" size={25} color="black" />
                      </IconButton>
                      <Text>{'      '}</Text>
                      <IconButton onPress={() => showDeleteAlert(event.id)}>
                        <Icon name="delete" size={25} color="red" />
                      </IconButton>
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
