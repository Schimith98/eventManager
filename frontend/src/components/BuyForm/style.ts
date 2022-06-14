import styled from 'styled-components/native';
import {TextInput, Button} from 'react-native-paper';

export const Container = styled.ScrollView`
  display: flex;
  flex-direction: column;
  background-color: #e8e4e4;
`;

export const InsideContainer1 = styled.ScrollView`
  display: flex;
  flex-direction: column;
  background-color: #6200ee;
  padding: 16px;
`;

export const CloseButton = styled.TouchableOpacity`
  align-self: flex-end;
`;

export const Text = styled.Text`
  font-size: 16px;
  color: white;
  text-align: center;
`;

export const Price = styled.Text`
  font-size: 44px;
  color: white;
  text-align: center;
`;

export const Input = styled(TextInput)`
  margin: 8px 0;
`;

export const SubmitButton = styled(Button)`
  margin: 16px;
`;
