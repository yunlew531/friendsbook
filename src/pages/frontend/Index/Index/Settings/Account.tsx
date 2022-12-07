import styled from '@emotion/styled';
import Btn from 'components/Btn';
import React, { useState } from 'react';

const Wrap = styled.div`
  height: 100%;
  display: flex;
  justify-content: center;
`;

const SettingPanel = styled.div<IThemeProps>`
  max-width: 800px;
  width: 100%;
  border-radius: 8px;
  padding: 30px;
`;

const Title = styled.h3<IThemeProps>`
  font-size: ${({ theme }) => theme.fontSizes.fs_1};
  padding-bottom: 10px;
`;

const SettingList = styled.ul<IThemeProps>`
  list-style: none;
  margin: 0;
`;

const SettingItem = styled.li<IThemeProps>`
  border: 1px solid ${({ theme }) => theme.color.black_300};
  border-radius: 8px;
  overflow: hidden;
`;

const SettingItemHeader = styled.div<IThemeProps>`
  background-color: ${({ theme }) => theme.color.gray_100};
`;

const SettingItemTitle = styled.h4`
  padding: 10px 20px;
`;

const SettingItemMain = styled.div<IThemeProps>`
  display: flex;
  align-items: center;
  background-color: ${({ theme }) => theme.color.white_100};
  cursor: default;
  padding: 20px;
  transition: filter .1s ease-in-out;
  .material-icons-round {
    margin-right: 5px;
  }
  &:hover {
    filter: brightness(0.97);
  }
  &:active {
    filter: brightness(0.95);
  }
`;

const SettingItemEditPanel = styled.form<IThemeProps>`
  padding: 20px;
  background-color: ${({ theme }) => theme.color.gray_400};
`;

const InputGroup = styled.div<IThemeProps>`
  p {
    font-size: ${({ theme }) => theme.fontSizes.fs_4};
  }
  margin-bottom: 10px;
  &:first-of-type {
    margin-bottom: 20px;
  }
  p {
    margin-bottom: 5px;
  }
  input {
    border: 1px solid ${({ theme }) => theme.color.secondary};
    border-radius: 5px;
    padding: 5px 10px;
    &:focus-visible {
      outline: 1px solid ${({ theme }) => theme.color.primary};
    }
  }
`;

const EditPasswordFooter = styled.div`
  display: flex;
`;

const SavePasswordBtn = styled(Btn)<IThemeProps>`
  display: flex;
  align-items: center;
  border: none;
  color: ${({ theme }) => theme.color.green_100};
  &:hover {
    transform: scale(1.1);
  }
  &:active {
    transform: scale(0.97);
  }
  .material-icons-outlined {
    margin-right: 3px;
    font-size: ${({ theme }) => theme.fontSizes.fs_3};
  }
`;

type CurrentEdit = 'password' | '';

const Account: React.FC = () => {
  const [currentEdit, setCurrentEdit] = useState<CurrentEdit>('');

  return (
    <Wrap>
      <SettingPanel>
        <Title>帳號設定</Title>
        <SettingList>
          <SettingItem>
            <SettingItemHeader>
              <SettingItemTitle>登入</SettingItemTitle>
            </SettingItemHeader>
            <SettingItemMain onClick={() => setCurrentEdit('password')}>
              <span className="material-icons-round">vpn_key</span>
              <p>更改密碼</p>
            </SettingItemMain>
            {
              currentEdit === 'password' && (
              <SettingItemEditPanel onSubmit={() => {}}>
                <InputGroup>
                  <p>目前密碼</p>
                  <input type="password" />
                </InputGroup>
                <InputGroup>
                  <p>新密碼</p>
                  <input type="password" />
                </InputGroup>
                <InputGroup>
                  <p>再輸入一次密碼</p>
                  <input type="password" />
                </InputGroup>
                <EditPasswordFooter>
                  <SavePasswordBtn type="submit">
                    <span className="material-icons-outlined">save</span>
                    儲存
                  </SavePasswordBtn>
                  <SavePasswordBtn type="button" onClick={() => setCurrentEdit('')}>
                    <span className="material-icons-outlined">logout</span>關閉
                  </SavePasswordBtn>
                </EditPasswordFooter>
              </SettingItemEditPanel>
              )
            }
          </SettingItem>
        </SettingList>
      </SettingPanel>
    </Wrap>
  );
};

export default Account;
