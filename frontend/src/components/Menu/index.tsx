import React, {useState} from 'react';
import Modal from 'react-native-modal';
import {Container, Button, Title} from './style';
import Icon from 'react-native-vector-icons/Feather';
import {TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {HomeScreenNavigation} from '../../interfaces/navigation';

const Menu = () => {
  const [isModalVisible, setModalVisible] = useState(false);
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const navigation = useNavigation<HomeScreenNavigation>();

  const goTo = routeName => {
    navigation.navigate(routeName);
    toggleModal();
  };

  return (
    <>
      <Modal
        isVisible={isModalVisible}
        animationIn="slideInLeft"
        animationOut="slideOutLeft"
        backdropColor="rgba(0,0,0,0)"
        style={{margin: 0, width: 150}}
        onBackdropPress={() => toggleModal()}
        onBackButtonPress={() => toggleModal()}>
        <Container>
          <Button onPress={() => goTo('Home')}>
            <Icon name="home" size={16} color="#6200ee" />
            <Title>Início</Title>
          </Button>
          <Button onPress={() => goTo('Admin')}>
            <Icon name="clipboard" size={16} color="#6200ee" />
            <Title>Adm. Eventos</Title>
          </Button>
        </Container>
      </Modal>
      <TouchableOpacity onPress={toggleModal}>
        <Icon name="menu" size={25} color="#6200ee" />
      </TouchableOpacity>
    </>
  );
};

export default Menu;
