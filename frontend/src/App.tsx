import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import Header from './components/Header';
import Routes from './routes';

const App: React.FC = () => {
  return (
    <NavigationContainer independent={true}>
      <Header />
      <Routes />
    </NavigationContainer>
  );
};

export default App;
