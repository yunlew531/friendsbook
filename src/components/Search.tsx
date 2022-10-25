import React from 'react';
import styled from '@emotion/styled';
import Btn from './Btn';

const SearchGroup = styled.div`
  display: flex;
  align-items: stretch;
  margin-bottom: 16px;
`;

const SearchInput = styled.input<IThemeProps>`
  max-width: 300px;
  width: 100%;
  border: 1px solid ${({ theme }) => theme.color.gray_400};
  border-radius: 10px;
  font-size: ${({ theme }) => theme.fontSizes.fs_3};
  padding: 10px 15px;
  margin-right: 10px;
  &:focus {
    outline: 1px solid ${({ theme }) => theme.color.secondary};
  }
`;

const SearchBtn = styled(Btn)<IThemeProps>`
  display: flex;
  align-items: center;
  border: 1px solid ${({ theme }) => theme.color.orange_100};
  background-color: ${({ theme }) => theme.color.white_100};
  border-radius: 10px;
  &:hover {
    transform: scale(1.05);
    .material-icons-round {
      color: ${({ theme }) => theme.color.primary};
    }
  }
  &:active {
    transform: scale(0.95);
  }
`;

interface ISearchProps {
  placeholder: string;
}

// eslint-disable-next-line arrow-body-style
const Search: React.FC<ISearchProps> = ({ placeholder }) => {
  return (
    <SearchGroup>
      <SearchInput placeholder={placeholder} />
      <SearchBtn type="button">
        <span className="material-icons-round">search</span>
      </SearchBtn>
    </SearchGroup>
  );
};

export default Search;
