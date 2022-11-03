import styled from '@emotion/styled';
import Btn from 'components/Btn';
import React from 'react';

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
  border-bottom: 1px solid ${({ theme }) => theme.color.gray_300};
  padding-bottom: 10px;
`;

const SettingList = styled.ul`
  list-style: none;
  margin: 0;
`;

const SettingItem = styled.li<IThemeProps>`
  border-bottom: 1px solid ${({ theme }) => theme.color.gray_400};
  padding: 10px;
`;

const SettingItemContent = styled.div`
  display: flex;
  align-items: center;
`;

const SettingItemTitle = styled.h4`
  width: 100px;
`;

const SettingItemMain = styled.div<IThemeProps>`
  flex-grow: 1;
  .main-email-span {
    color: ${({ theme }) => theme.color.gray_300};
    font-size: ${({ theme }) => theme.fontSizes.fs_5};
  }
`;

const EditButton = styled(Btn)<IThemeProps>`
  display: flex;
  align-items: center;
  transition: transform .1s ease-in-out;
  &:hover {
    transform: scale(1.1);
    .material-icons-outlined {
      color: ${({ theme }) => theme.color.primary};
    }
  }
  &:active {
    transform: scale(0.97);
  }
  .material-icons-outlined {
    color: ${({ theme }) => theme.color.secondary};
    font-size: ${({ theme }) => theme.fontSizes.fs_1};
    transition: color .1s ease-in-out;
  }
  .delete-icon {
    color: ${({ theme }) => theme.color.red_100};
  }
`;

const SettingItemEditPanel = styled.div<IThemeProps>`
  display: flex;
  align-items: center;
  background-color: ${({ theme }) => theme.color.gray_400};
  border-radius: 8px;
  margin: 0 -10px;
  padding: 10px;
`;

const SettingItemEditPanelTitle = styled.h4<IThemeProps>`
  flex-shrink: 0;
  width: 100px;
  align-self: flex-start;
`;

const SettingItemEditPanelInput = styled.input<IThemeProps>`
  flex-grow: 1;
  border-radius: 5px;
  border: 1px solid ${({ theme }) => theme.color.orange_100};
  padding: 5px 10px;
  margin-right: auto;
  &:focus-visible {
    outline: 1px solid ${({ theme }) => theme.color.secondary};
  }
`;

const SettingItemEditPanelSaveBtn = styled.button<IThemeProps>`
  flex-shrink: 0;
  display: flex;
  align-items: center;
  border: none;
  color: ${({ theme }) => theme.color.green_100};
  margin-left: 30px;
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

const EmailList = styled.ul`
  list-style: none;
  margin: 20px 0;
`;

const EmailItem = styled.li`
  display: flex;
  align-items: center;
  p {
    margin-right: 10px;
  }
`;

const AddEmailGroup = styled.div`
  display: flex;
  align-items: center;
`;

const AddEmailBtn = styled(Btn)<IThemeProps>`
  display: flex;
  align-items: center;
  transition: transform .1s ease-in-out;
  color: ${({ theme }) => theme.color.primary};
  &:hover {
    transform: scale(1.1);
  }
  &:active {
    transform: scale(0.97);
  }
  .material-icons-round {
    margin-right: 3px;
    font-size: ${({ theme }) => theme.fontSizes.fs_3};
  }
`;

// eslint-disable-next-line arrow-body-style
const General: React.FC = () => {
  return (
    <Wrap>
      <SettingPanel>
        <Title>一般設定</Title>
        <SettingList>
          <SettingItem>
            <SettingItemContent>
              <SettingItemTitle>姓名</SettingItemTitle>
              <SettingItemMain>
                <p>王小花</p>
              </SettingItemMain>
              <EditButton type="button">
                <span className="material-icons-outlined">settings</span>
              </EditButton>
            </SettingItemContent>
            <SettingItemEditPanel>
              <SettingItemEditPanelTitle>姓名</SettingItemEditPanelTitle>
              <SettingItemEditPanelInput value="王小花" onChange={() => {}} />
              <SettingItemEditPanelSaveBtn type="button">
                <span className="material-icons-outlined">save</span>儲存
              </SettingItemEditPanelSaveBtn>
            </SettingItemEditPanel>
          </SettingItem>
          <SettingItem>
            <SettingItemContent>
              <SettingItemTitle>聯絡資料</SettingItemTitle>
              <SettingItemMain>
                <p>aaa@gmail.com</p>
              </SettingItemMain>
              <EditButton type="button">
                <span className="material-icons-outlined">settings</span>
              </EditButton>
            </SettingItemContent>
            <SettingItemEditPanel>
              <SettingItemEditPanelTitle>聯絡資料</SettingItemEditPanelTitle>
              <SettingItemMain>
                <p>aaa@gmail.com <span className="main-email-span">(主要)</span></p>
                <EmailList>
                  <EmailItem>
                    <SettingItemEditPanelInput value="aaa@gmail.com" onChange={() => {}} />
                    <p>aaa@gmail.com</p>
                    <EditButton type="button">
                      <span className="material-icons-outlined">settings</span>
                    </EditButton>
                    <EditButton type="button">
                      <span className="material-icons-outlined delete-icon">delete</span>
                    </EditButton>
                  </EmailItem>
                </EmailList>
                <AddEmailGroup>
                  <SettingItemEditPanelInput placeholder="填寫想新增的Email" value="" onChange={() => {}} />
                  <AddEmailBtn type="button">
                    <span className="material-icons-round">add</span>新增Email
                  </AddEmailBtn>
                </AddEmailGroup>
              </SettingItemMain>
              <SettingItemEditPanelSaveBtn type="button">
                <span className="material-icons-outlined">logout</span>關閉
              </SettingItemEditPanelSaveBtn>
            </SettingItemEditPanel>
          </SettingItem>
        </SettingList>
      </SettingPanel>
    </Wrap>
  );
};

export default General;
