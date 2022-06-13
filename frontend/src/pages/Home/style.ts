import styled from 'styled-components/native';
import {List} from 'react-native-paper';

export const Container = styled.ScrollView`
  background-color: #6200ee;
  height: 100%;
  width: 100%;
  padding-bottom: 60px;
`;

export const TitleContainer = styled.View`
  background-color: #6200ee;
  padding: 16px;
`;

export const Title = styled.Text`
  color: #fff;
  font-size: 40px;
  margin: 7px 0 5px;
  text-transform: uppercase;
  text-align: center;
`;

export const Subtitle = styled.Text`
  color: #fff;
  font-size: 17px;
  text-align: center;
`;

export const Image = styled.Image`
  width: 100%;
  height: 120px;
`;

export const AccordionGroup = styled(List.AccordionGroup)``;
export const Accordion = styled(List.Accordion)``;
export const Item = styled(List.Item)`
  background-color: white;
`;
