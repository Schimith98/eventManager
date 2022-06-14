import styled from 'styled-components/native';

export const Container = styled.View`
  background-color: white;
  display: flex;
  flex-direction: column;
  padding: 16px 16px 60px 16px;
  height: 100%;
`;

export const TableContainer = styled.ScrollView`
  background-color: #f3f3f3;
  border-radius: 8px;
  margin-top: 8px;
`;

export const Title = styled.Text`
  color: #6200ee;
  font-size: 22px;
`;

export const PlusButton = styled.TouchableOpacity`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 136px;
  padding: 0 8px;
  background-color: #f3f3f3;
  border-radius: 8px;
`;

export const Text = styled.Text`
  color: green;
  font-size: 18px;
  margin: 8px 0;
  justify-content: center;
`;

export const IconButton = styled.TouchableOpacity`
  margin: 0 160px;
`;
