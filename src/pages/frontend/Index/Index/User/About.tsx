import styled from '@emotion/styled';
import Card from 'components/Card';
import React, { useState } from 'react';
import Skeleton from 'react-loading-skeleton';
import { useOutletContext } from 'react-router-dom';

const AboutCard = styled(Card)`
  display: flex;
  h2, h3 {
    font-weight: 700; 
    color: ${({ theme }) => theme.color.blue_300};
  }
`;

const AboutNavListContainer = styled.div<IThemeProps>`
  width: 250px;
  border-right: 1px solid ${({ theme }) => theme.color.gray_400};
`;

const AboutNavList = styled.ul<IThemeProps>`
  list-style: none;
  padding-right: 5px;
`;

interface IAboutNavItemProps extends IThemeProps {
  active: boolean;
}

const AboutNavItem = styled.li<IAboutNavItemProps>`
  border-radius: 5px;
  background-color: ${({ theme: { color: { gray_400 } }, active }) => (active ? gray_400 : 'transparent')};
  cursor: default;
  padding: 5px 10px;
`;

const AboutMainSection = styled.div<IThemeProps>`
  flex-grow: 1;
  padding-left: 16px;
  .material-icons-outlined {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 35px;
    height: 35px;
    cursor: default;
    font-size: ${({ theme }) => theme.fontSizes.s};
    border-radius: 100%;
    background-color: ${({ theme }) => theme.color.gray_400};
    margin-right: 16px;
  }
`;

const CardTitle = styled.h2<IThemeProps>`
  font-size: ${({ theme }) => theme.fontSizes.fs_2};
`;

const CardSubTitle = styled.h3<IThemeProps>`
  font-size: ${({ theme }) => theme.fontSizes.fs_3};
  margin: 10px 0 5px;
  &:first-of-type {
    margin-top: 0;
  }
`;

const CitySection = styled.div`
  display: flex;
  align-items: center;
  .city-skeleton {
    margin-right: 16px;
  }
`;

type CurrentDisplay = '總覽' | '居住地' | '家人與感情狀況';

const About: React.FC = () => {
  const { user, isGetProfileFetching }: IOutletContext = useOutletContext();
  const [currentDisplay, setCurrentDisplay] = useState<CurrentDisplay>('總覽');

  return (
    <AboutCard>
      <AboutNavListContainer>
        <CardTitle>關於</CardTitle>
        <AboutNavList>
          <AboutNavItem
            active={currentDisplay === '總覽'}
            onClick={() => setCurrentDisplay('總覽')}
          >總覽
          </AboutNavItem>
          <AboutNavItem
            active={currentDisplay === '居住地'}
            onClick={() => setCurrentDisplay('居住地')}
          >居住地
          </AboutNavItem>
          <AboutNavItem
            active={currentDisplay === '家人與感情狀況'}
            onClick={() => setCurrentDisplay('家人與感情狀況')}
          >家人與感情狀況
          </AboutNavItem>
        </AboutNavList>
      </AboutNavListContainer>
      <AboutMainSection>
        <CardSubTitle>{currentDisplay}</CardSubTitle>
        {currentDisplay === '總覽' && <CardSubTitle>居住地</CardSubTitle>}
        {
          (currentDisplay === '總覽' || currentDisplay === '居住地') && (
          <CitySection>
            {isGetProfileFetching
              ? <Skeleton className="city-skeleton" borderRadius={50} width={35} height={35} />
              : (<span className="material-icons-outlined">home</span>)}
            {isGetProfileFetching
              ? <Skeleton width={100} height={20} />
              : <p>{user?.city ? user.city : '沒有家鄉可以顯示'}</p>}
          </CitySection>
          )
        }
        {currentDisplay === '總覽' && <CardSubTitle>家人與感情狀況</CardSubTitle>}

      </AboutMainSection>
    </AboutCard>
  );
};

export default About;
