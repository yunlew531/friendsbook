import React, { useState } from 'react';
import Card from 'components/Card';
import styled from '@emotion/styled';
import Btn from 'components/Btn';
import UserCard from 'components/UserCard';

const AboutCard = styled(Card)`
  display: flex;
  padding: 0;
`;

const TitleContainer = styled.div<IThemeProps>`
  width: 200px;
  border-right: 1px solid ${({ theme }) => theme.color.gray_400};
  padding: 20px;
  h3 {
    margin-bottom: 10px;
  }
`;

interface ITitleBtn {
  active: boolean;
}

const TitleBtn = styled(Btn)<IThemeProps & ITitleBtn>`
  display: block;
  width: 100%;
  font-weight: ${({ active }) => (active ? 700 : 400)};
  font-size: ${({ theme }) => theme.fontSizes.fs_3};
  color: ${({ theme }) => theme.color.black_200};
  text-align: left;
  border-radius: 5px;
  background-color: ${({ active, theme: { color: { white_100, gray_200 } } }) => (active ? gray_200 : white_100)};
  box-shadow: inset ${({ active, theme }) => (active ? theme.shadow.s : '')};
  padding: 5px;
  margin-bottom: 5px;
`;

const AboutContentSection = styled.div<IThemeProps>`
  display: none;
  flex-grow: 1;
  padding: 20px;
  margin-bottom: -10px;
  h4 {
    margin-bottom: 5px;
  }
  .content, .material-icons-outlined {
    font-size: ${({ theme }) => theme.fontSizes.fs_3};
  }
  .content {
    display: flex;
    align-items: center;
    margin-bottom: 10px;
  }
  .material-icons-outlined {
    margin-right: 5px;
  }
  &.show {
    display: block;
  }
`;

const UserList = styled.ul`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 10px;
  margin: 0;
`;

const Note = styled.p<IThemeProps>`
  font-size: ${({ theme }) => theme.fontSizes.fs_4};
  margin-bottom: 5px;
`;

type CurrentDisplay = 'contract' | 'buildAndManage';

const FanAbout: React.FC = () => {
  const [currentDisplay, setCurrentDisplay] = useState<CurrentDisplay>('contract');

  return (
    <AboutCard>
      <TitleContainer>
        <h3>關於</h3>
        <TitleBtn active={currentDisplay === 'contract'} type="button" onClick={() => setCurrentDisplay('contract')}>類別與聯絡資料</TitleBtn>
        <TitleBtn active={currentDisplay === 'buildAndManage'} type="button" onClick={() => setCurrentDisplay('buildAndManage')}>建立與管理員</TitleBtn>
      </TitleContainer>
      <AboutContentSection className={currentDisplay === 'contract' ? 'show' : ''}>
        <h4>類別</h4>
        <p className="content"><span className="material-icons-outlined">music_note</span>娛樂影視人員</p>
        <h4>聯絡</h4>
        <p className="content">abc@gmail.com</p>
      </AboutContentSection>
      <AboutContentSection className={currentDisplay === 'buildAndManage' ? 'show' : ''}>
        <h4>建立日期</h4>
        <p className="content"><span className="material-icons-outlined">watch_later</span>2022-10-22</p>
        <h4>管理員</h4>
        <Note>粉絲專頁管理員可能選擇隱藏其資訊</Note>
        <UserList>
          <UserCard />
        </UserList>
      </AboutContentSection>
    </AboutCard>
  );
};

export default FanAbout;
