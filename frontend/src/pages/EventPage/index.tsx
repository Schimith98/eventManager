import React, {useEffect, useState} from 'react';
import {events as eventsService} from '../../services/events';
import {
  Image,
  MainContainer,
  InsideContainer1,
  Title,
  Subtitle,
  ButtonContainer,
  ButtonText,
  InsideContainer2,
  SectionDivider,
  SectionData,
} from './style';
import {useNavigation} from '@react-navigation/native';
import {IEvent} from '../../interfaces/event';
import {View, Text} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import Loading from '../../components/Loading';

const EventPage: React.FC = ({route}) => {
  const [event, setEvent] = useState<IEvent | null>();

  const navigation = useNavigation();

  useEffect(() => {
    if (route.params.event) {
      setEvent(route.params.event);
    } else {
      navigation.navigate('Home');
    }
  }, []);

  return (
    <>
      {event && (
        <MainContainer>
          <InsideContainer1>
            <Image source={{uri: event.imageURL}}></Image>
            <Title>{event.title}</Title>

            <Subtitle>
              <Icon name="enviromento" size={16} color="white" /> {event.place}
            </Subtitle>
            <ButtonContainer>
              <ButtonText>COMPRAR INGRESSO</ButtonText>
            </ButtonContainer>
          </InsideContainer1>
          <InsideContainer2>
            <SectionDivider>
              <Text>
                <Icon name="calendar" size={16} color="black" /> Data e Hora
              </Text>
            </SectionDivider>
            <SectionData>
              {event.date} - {event.hour}
            </SectionData>
            <SectionDivider>
              <Text>
                <Icon name="profile" size={16} color="black" /> Descrição
              </Text>
            </SectionDivider>
            <SectionData>{event.description}</SectionData>
            <SectionDivider>
              <Text>
                <Icon name="enviromento" size={16} color="black" /> Local
              </Text>
            </SectionDivider>
            <SectionData>{event.place}</SectionData>
            <SectionDivider>
              <Text>
                <Icon name="warning" size={16} color="black" /> Atenção
              </Text>
            </SectionDivider>
            <SectionData>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam
              pretium erat non vehicula fringilla. Vestibulum non elementum
              enim, a cursus velit. Donec sem sapien, sollicitudin a purus sit
              amet, luctus feugiat arcu. In in tellus nulla. Ut malesuada erat
              neque, eget cursus mi scelerisque vitae. Suspendisse potenti.
              Integer aliquet mollis eros, at sodales orci. In ac urna sit amet
              lectus rhoncus congue egestas vel eros. Sed pulvinar risus sit
              amet augue imperdiet lobortis. Etiam placerat maximus tortor, sit
              amet molestie erat commodo eget. Praesent nec suscipit ipsum, id
              placerat lectus.
            </SectionData>
          </InsideContainer2>
        </MainContainer>
      )}
    </>
  );
};

export default EventPage;
