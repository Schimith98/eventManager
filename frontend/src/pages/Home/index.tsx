import React, {useState, useEffect} from 'react';
import {View, Text, Button} from 'react-native';
import Header from '../../components/Header';
import Menu from '../../components/Menu';
import {
  Container,
  Subtitle,
  Title,
  TitleContainer,
  Image,
  AccordionGroup,
  Accordion,
  Item,
} from './style';
import {Divider, List} from 'react-native-paper';
import {IEvent} from '../../interfaces/event';
import {events as eventsService} from '../../services/events';
import Loading from '../../components/Loading';

const eventImageDefault1 = {
  uri: 'https://atualeventos.com/wp-content/uploads/2020/09/atual-eventos-banner.jpg',
};
const eventImageDefault2 = {
  uri: 'https://d8rsosim10d20.cloudfront.net/small_samuel_pereira_uf2nn_AN_Wa8_Q_unsplash_1_b8d0c29126.jpg',
};

const Home: React.FC = () => {
  const [companyEventList, setCompanyEventList] = useState<
    IEvent[] | undefined
  >(undefined);
  const [collegeEventList, setCollegeEventList] = useState<
    IEvent[] | undefined
  >(undefined);

  const [loading, setLoading] = useState<boolean>(false);

  const getData = async () => {
    try {
      setLoading(true);
      const response = await eventsService.getAll();
      const eventList = response.data;
      breakEventList(eventList);
    } catch (error) {
      console.log('Error /admin/getData(): ' + error);
    }
    setLoading(false);
  };

  const breakEventList = async (eventList: IEvent[]) => {
    const auxCompanyEventsList: IEvent[] = [];
    const auxCollegeEventsList: IEvent[] = [];

    eventList.forEach((event, i) => {
      if (event.type === 'empresas') {
        auxCompanyEventsList.push(event);
      } else if (event.type === 'universidades') {
        auxCollegeEventsList.push(event);
      }
    });

    setCollegeEventList(auxCompanyEventsList);
    setCompanyEventList(auxCollegeEventsList);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <Container>
      <TitleContainer>
        <Title>DESTAQUES</Title>
        <Subtitle>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec in est
          aliquam, finibus ante ac, suscipit arcu.
        </Subtitle>
      </TitleContainer>
      {loading ? (
        <Loading />
      ) : (
        <AccordionGroup>
          <View>
            <Image source={eventImageDefault1}></Image>
          </View>
          <Accordion title="Empresas" id="1">
            {companyEventList?.map((e, i) => (
              <Item
                title={e.title}
                description={`${e.place}\n${e.date} às ${e.hour}`}
                left={props => <List.Icon {...props} icon="calendar" />}
                key={(i * 2) / 100}
              />
            ))}
          </Accordion>
          <View>
            <Image source={eventImageDefault2}></Image>
          </View>
          <Accordion title="Universidades" id="2">
            {collegeEventList?.map((e, i) => (
              <Item
                title={e.title}
                description={`${e.place}\n${e.date} às ${e.hour}`}
                left={props => <List.Icon {...props} icon="calendar" />}
                key={i * 2}
              />
            ))}
          </Accordion>
        </AccordionGroup>
      )}
    </Container>
  );
};

export default Home;
