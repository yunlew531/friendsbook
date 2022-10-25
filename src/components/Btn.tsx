import styled from '@emotion/styled';

interface BtnProps {
  anime?: boolean;
}

const Btn = styled.button<BtnProps>`
  background-color: transparent;
  border: none;
  ${
  ({ anime }) => anime && (`
  transition: filter .2s ease-in-out, transform .1s ease-in-out;
  &:hover {
    filter: brightness(0.95);
  }
  &:active {
    transform: scale(0.95);
  }`)
}
`;

export const MoreBtn = styled(Btn)<IThemeProps>`
  display: flex;
  align-items: center;
  border-radius: 10px;
  background-color: ${({ theme }) => theme.bgColor};
  .more-horiz-icon {
    font-size: ${({ theme }) => theme.fontSizes.fs_1};
    color: ${({ theme }) => theme.color.gray_500}
  }
`;

export default Btn;
