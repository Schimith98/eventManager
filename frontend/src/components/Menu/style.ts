import styled from 'styled-components/native';

export const Container = styled.View`
  background-color: #f1f1f1;
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: 16px;
`;

export const Button = styled.TouchableOpacity`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

export const Title = styled.Text`
  color: #00a5db;
  margin: 8px 0;
  padding-left: 8px;
`;
