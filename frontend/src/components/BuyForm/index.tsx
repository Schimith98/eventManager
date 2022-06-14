import React, {useEffect, useState} from 'react';
import {
  CloseButton,
  Container,
  Input,
  InsideContainer1,
  Price,
  SubmitButton,
  Text,
} from './style';
import {IEvent, ITicket} from '../../interfaces/event';
import Icon from 'react-native-vector-icons/AntDesign';
import {Alert} from 'react-native';
import {events as eventsService} from '../../services/events';
import {useNavigation} from '@react-navigation/native';
import {EventPageScreenNavigation} from '../../interfaces/navigation';

interface IBuyFormProps {
  event: IEvent | undefined;
  toogleModalVisibility: VoidFunction;
}

const BuyForm = ({event, toogleModalVisibility}: IBuyFormProps) => {
  const [email, setEmail] = useState<string>('');
  const [ticket, setTicket] = useState<ITicket | undefined>(undefined);

  const navigation = useNavigation<EventPageScreenNavigation>();

  const payment: VoidFunction = async () => {
    try {
      const newEvent: IEvent | undefined = await tradeTicket();
      if (newEvent) {
        const response = await eventsService.save(newEvent);
        if (response.status === 200) {
          Alert.alert('Pagamento realizado!');
          navigation.navigate('Home');
        }
      }
    } catch (error) {
      console.log('Error /BuyForm/payment: ' + error);
    }
  };

  const tradeTicket = async (): Promise<IEvent | undefined> => {
    const newEvent: IEvent = event!;
    const index: number = event!.tickets.findIndex(t => t.id === ticket?.id);
    if (index > -1) {
      newEvent!.tickets[index].available = false;
      newEvent!.tickets[index].buyerEmail = email;
      return newEvent;
    } else {
      Alert.alert('Ingressos esgotados');
      return undefined;
    }
  };

  const getTicket = () => {
    const availableTicket = event!.tickets.find(t => t.available === true);
    if (availableTicket) {
      setTicket(availableTicket);
    } else {
      Alert.alert('Ingressos esgotados');
      navigation.navigate('Home');
    }
  };

  useEffect(() => {
    getTicket();
  }, []);

  return (
    <Container>
      <InsideContainer1>
        <CloseButton onPress={() => toogleModalVisibility()}>
          <Icon name="closecircleo" size={32} color="red" />
        </CloseButton>
        <Text>Valor</Text>
        <Price>R${ticket?.price}</Price>
      </InsideContainer1>
      <Input
        label="Email"
        value={email}
        onChangeText={email => setEmail(email)}
      />
      <SubmitButton mode="contained" onPress={() => payment()}>
        Pagar
      </SubmitButton>
    </Container>
  );
};

export default BuyForm;
