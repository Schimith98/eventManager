import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import {View, Text} from 'react-native';
import Header from './components/Header';
import Home from './pages/Home';
import Routes from './routes';
import {navigationRef} from './routes/RootNavigation';

const App: React.FC = () => {
  return (
    <NavigationContainer ref={navigationRef}>
      <Header />
      <Routes />
    </NavigationContainer>
  );
};

export default App;
