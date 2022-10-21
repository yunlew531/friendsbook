import styled from '@emotion/styled';

const Card = styled.div<IThemeProps>`
  background-color: ${({ theme }) => theme.cardColor};
  border: 1.5px solid ${({ theme }) => theme.color.gray_400};
  border-radius: 8px;
  padding: 20px;
`;

export default Card;
