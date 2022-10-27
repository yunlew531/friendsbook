import React from 'react';
import styled from '@emotion/styled';
import { Link } from 'react-router-dom';
import Btn from 'components/Btn';
import UserCard from 'components/UserCard';

const Wrap = styled.div<IThemeProps>`
  background-color: ${({ theme }) => theme.color.black_500};
  padding: 100px 150px;
`;

const Title = styled.p<IThemeProps>`
  font-size: 50px;
  font-weight: 700;
  color: ${({ theme }) => theme.color.white_100};
  margin-bottom: 100px;
`;

const FansPagePanel = styled.div<IThemeProps>`
  max-width: 800px;
  border-radius: 20px;
  background-color: ${({ theme }) => theme.color.white_100};
  padding: 30px;
  margin: 0 auto;
`;

const FansPageHeader = styled.div<IThemeProps>`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  border-bottom: 1px solid ${({ theme }) => theme.color.black_100};
  padding-bottom: 10px;
`;

const FansPageTitle = styled.p<IThemeProps>`
  font-size: ${({ theme }) => theme.fontSizes.s};
  font-weight: 700;
  margin-bottom: 5px;
`;

const FansPageDesc = styled.p<IThemeProps>`
  display: flex;
  align-items: center;
  font-size: ${({ theme }) => theme.fontSizes.fs_3};
  color: ${({ theme }) => theme.color.gray_300};
  .public-icon {
    margin-right: 3px;
  }
`;

const FansPageBtn = styled(Btn)<IThemeProps>`
  display: flex;
  align-items: center;
  font-size: ${({ theme }) => theme.fontSizes.fs_3};
  font-weight: 700;
  border-radius: 10px;
  background-color: ${({ theme }) => theme.color.gray_400};
  padding: 8px 10px;
`;

const JoinGroupBtn = styled(FansPageBtn)<IThemeProps>`
  background-color: ${({ theme }) => theme.color.gray_100};
  padding: 8px 8px 8px 15px;
  margin-left: auto;
  margin-right: 10px;
  .groups-icon {
    margin-right: 5px;
  }
`;

const InviteBtn = styled(FansPageBtn)<IThemeProps>`
  color: ${({ theme }) => theme.color.white_100};
  background-color: ${({ theme }) => theme.color.primary};
  padding-right: 15px;
  .expand-more-icon {
    margin-right: 5px;
  }
`;

const FansPageNav = styled.nav<IThemeProps>`
  display: flex;
  align-items: center;
  list-style: none;
  a {
    text-decoration: none;
    font-size: ${({ theme }) => theme.fontSizes.fs_2};
    font-weight: 700;
    color: ${({ theme }) => theme.color.black_100};
    padding: 10px 10px 7px;
    border-bottom: 3px transparent solid;
    &:nth-of-type(2) {
      color: ${({ theme }) => theme.color.blue_100};
      border-bottom: 3px ${({ theme }) => theme.color.blue_100} solid;
    }
  }
`;

const MemberList = styled.ul`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 10px;
`;

// eslint-disable-next-line arrow-body-style
const FansPageSection: React.FC = () => {
  return (
    <Wrap>
      <Title>尋找、聚集相關同好</Title>
      <FansPagePanel>
        <FansPageHeader>
          <div>
            <FansPageTitle>攝影小宇宙</FansPageTitle>
            <FansPageDesc>
              <span className="material-icons-outlined public-icon">public</span>
              公開社團 11.7 萬位成員
            </FansPageDesc>
          </div>
          <JoinGroupBtn type="button" anime>
            <span className="material-icons-outlined groups-icon">groups</span>
            已加入
            <span className="material-icons-outlined expand-more-icon">expand_more</span>
          </JoinGroupBtn>
          <InviteBtn type="button" anime>
            <span className="material-icons-outlined">add</span>
            邀請
          </InviteBtn>
        </FansPageHeader>
        <FansPageNav>
          <Link to="＃">討論</Link>
          <Link to="＃">用戶</Link>
        </FansPageNav>
        <MemberList>
          {
            new Array(10).fill(null).map((member, idx) => (
              // eslint-disable-next-line react/no-array-index-key
              <UserCard key={idx} />
            ))
          }
        </MemberList>
      </FansPagePanel>
    </Wrap>
  );
};

export default FansPageSection;
