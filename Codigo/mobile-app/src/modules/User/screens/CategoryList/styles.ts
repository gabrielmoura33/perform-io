import { FlatList } from 'react-native-gesture-handler';
import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';

export const Wrapper = styled.View`
  background-color: ${({ theme }) => theme.colors.Secondary};
`;
export const Container = styled.View`
  /* padding: 0 ${RFValue(25)}px 0 0; */
  flex-direction: row;
`;

export const CategoryWrapper = styled.View`
  width: 165px;
  height: 137px;
`;
