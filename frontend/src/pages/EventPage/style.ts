import styled from 'styled-components/native';

export const MainContainer = styled.ScrollView`
  height: 100%;
  width: 100%;
  padding-bottom: 60px;
  background-color: #f1f1f1;
`;

export const InsideContainer1 = styled.View`
  align-items: center;
  padding: 32px;
`;

export const Image = styled.Image`
  width: 140px;
  height: 186.666px;
  margin-bottom: 32px;
`;
export const Title = styled.Text`
  font-size: 22px;
  color: black;
  margin-bottom: 8px;
`;
export const Subtitle = styled.Text`
  font-size: 16px;
  color: black;
`;

export const ButtonContainer = styled.TouchableOpacity`
  background-color: #6200ee;
  margin-top: 16px;
  padding: 16px 32px;
  border-radius: 32px;
`;
export const ButtonText = styled.Text`
  color: white;
  font-size: 16px;
  text-transform: uppercase;
`;

export const InsideContainer2 = styled.View`
  padding-bottom: 32px;
`;
export const SectionDivider = styled.View`
  background-color: #e1e1e1;
  padding: 4px 16px;
`;
export const SectionData = styled.Text`
  margin: 8px 16px;
  font-size: 16px;
`;
