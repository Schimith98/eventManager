import React from 'react';
import Menu from '../Menu';
import {Container, Title} from './style';

const Header = () => {
  return (
    <Container>
      <Menu />
      <Title>Logo Ipsum</Title>
    </Container>
  );
};

export default Header;
