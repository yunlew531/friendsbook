import styled from '@emotion/styled';
import Btn from 'components/Btn';
import DefaultCard from 'components/Card';
import Search from 'components/Search';
import React from 'react';
import { Link } from 'react-router-dom';

const Wrap = styled.div`
  max-width: 800px;
  margin: 0 auto;
`;

const Card = styled(DefaultCard)`
  margin-bottom: 20px;
`;

const Title = styled.h2<IThemeProps>`
  font-size: ${({ theme }) => theme.fontSizes.fs_1};
  margin-bottom: 16px;
`;

const SubTitle = styled.h4<IThemeProps>`
  font-size: ${({ theme }) => theme.fontSizes.fs_2};
`;

const ClubList = styled.ul`
  list-style: none;
`;

const ClubItem = styled.li<IThemeProps>`
  > a {
    display: flex;
    align-items: center;
    text-decoration: none;
    border: 1px solid ${({ theme }) => theme.color.gray_400};
    background-color: ${({ theme }) => theme.color.white_100};
    border-radius: 10px;
    transition: filter .1s ease-in-out;
    padding: 10px;
    .title {
      display: inline-block;
      color: ${({ theme }) => theme.color.black_300};
      font-size: ${({ theme }) => theme.fontSizes.fs_2};
      transition: color .1s ease-in-out;
      margin: 0 5px 5px 0;
    }
    .members-qty {
      color: ${({ theme }) => theme.color.gray_500};
      font-size: ${({ theme }) => theme.fontSizes.fs_5};
    }
    &:hover {
      filter: brightness(0.97);
      .title {
        color: ${({ theme }) => theme.color.primary};
      }
    }
  }
`;

const ClubItemPhoto = styled.img`
  flex-shrink: 0;
  width: 50px;
  height: 50px;
  border-radius: 10px;
  margin-right: 10px;
`;

const ClubItemMain = styled.div`
  flex-grow: 1;
`;

const ClubItemDesc = styled.p<IThemeProps>`
  color: ${({ theme }) => theme.color.gray_300};
  font-size: ${({ theme }) => theme.fontSizes.fs_4};
`;

const ClubItemPinBtn = styled(Btn)`
  align-self: flex-start;
  transform: rotate(45deg);
`;

const RecommendPanelHeader = styled.div`
  display: flex;
  align-items: center;
`;

const RefreshRecommendClubsBtn = styled(Btn)<IThemeProps>`
  margin-left: auto;
  .material-icons {
    font-size: ${({ theme }) => theme.fontSizes.fs_1};
    color: ${({ theme }) => theme.color.primary};
    transition: transform .1s ease-in-out;
    &:hover {
      transform: scale(1.1);
    }
    &:active {
      transform: scale(1.1) rotate(90deg);
    }
  }
`;

// eslint-disable-next-line arrow-body-style
const Clubs: React.FC = () => {
  return (
    <Wrap>
      <Card>
        <Title>社團</Title>
        <Search placeholder="搜尋社團" />
      </Card>
      <Card>
        <SubTitle>已加入社團</SubTitle>
        <ClubList>
          <ClubItem>
            <Link to="/club/:id">
              <ClubItemPhoto src="https://images.unsplash.com/photo-1666688090267-4858c2075629?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80" alt="club" />
              <ClubItemMain>
                <h3 className="title">貓貓研究社</h3>
                <span className="members-qty">(10人加入)</span>
                <ClubItemDesc>最後發表時間: 2022-10-22</ClubItemDesc>
              </ClubItemMain>
              <ClubItemPinBtn>
                <span className="material-icons-outlined">push_pin</span>
                <span className="material-icons">push_pin</span>
              </ClubItemPinBtn>
            </Link>
          </ClubItem>
        </ClubList>
      </Card>
      <Card>
        <RecommendPanelHeader>
          <SubTitle>推薦社團</SubTitle>
          <RefreshRecommendClubsBtn type="button">
            <span className="material-icons">autorenew</span>
          </RefreshRecommendClubsBtn>
        </RecommendPanelHeader>
        <ClubList>
          <ClubItem>
            <Link to="/club/:id">
              <ClubItemPhoto src="https://images.unsplash.com/photo-1666688090267-4858c2075629?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80" alt="club" />
              <ClubItemMain>
                <h3 className="title">貓貓研究社</h3>
                <span className="members-qty">(10人加入)</span>
                <ClubItemDesc>最後發表時間: 2022-10-22</ClubItemDesc>
              </ClubItemMain>
            </Link>
          </ClubItem>
        </ClubList>
      </Card>
    </Wrap>
  );
};

export default Clubs;
