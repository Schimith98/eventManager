import {
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';
import {IEvent} from './event';

export type RootStackParamList = {
  Home: undefined;
  Admin: undefined;
  EventPage: {event: IEvent};
};

export type EventPageNavigationProps = NativeStackScreenProps<
  RootStackParamList,
  'EventPage'
>;
export type HomeNavigationProps = NativeStackScreenProps<
  RootStackParamList,
  'Home'
>;
export type AdminNavigationProps = NativeStackScreenProps<
  RootStackParamList,
  'Admin'
>;

export type EventPageScreenNavigation = NativeStackNavigationProp<
  RootStackParamList,
  'EventPage'
>;
export type HomeScreenNavigation = NativeStackNavigationProp<
  RootStackParamList,
  'EventPage'
>;
