import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.Secondary};
  align-items: center;
  justify-content: center;
`;
