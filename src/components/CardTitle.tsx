import styled from '@emotion/styled';

export default styled.h2<IThemeProps>`
  color: ${({ theme }) => theme.color.black_300};
  font-size: ${({ theme }) => theme.fontSizes.fs_2};
`;
