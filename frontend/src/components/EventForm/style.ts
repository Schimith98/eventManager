import styled from 'styled-components/native';
import {TextInput, Button} from 'react-native-paper';

export const Container = styled.ScrollView`
  display: flex;
  flex-direction: column;
  background-color: #e8e4e4;
  padding: 8px 8px 22px;
`;

export const Row = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

export const Title = styled.Text`
  color: #000;
  font-size: 22px;
`;

export const Label = styled.Text`
  color: #000;
  font-size: 16px;
`;

export const Text = styled.Text`
  color: #000;
  font-size: 16px;
  align-self: center;
`;

export const CloseButton = styled.TouchableOpacity``;

export const Input = styled(TextInput)`
  margin: 8px 0;
`;

export const SubmitButton = styled(Button)`
  margin: 16px;
`;
