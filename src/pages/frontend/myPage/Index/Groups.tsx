import React, { useState } from 'react';
import styled from '@emotion/styled';
import Btn from 'components/Btn';
import PublishPanel from 'components/PublishPanel';
import Card from 'components/Card';
import { Link } from 'react-router-dom';
import Articles from '../components/Articles';

const Wrap = styled.div`
  max-width: 800px;
  margin: 0 auto;
`;

const Header = styled(Card)<IThemeProps>`
  background-color: ${({ theme }) => theme.color.white_100};
  margin-bottom: 16px;
`;

const BannerImg = styled.img<IThemeProps>`
  height: 300px;
  border-radius: 10px;
  box-shadow: ${({ theme }) => theme.shadow.s};
  margin-bottom: 10px;
`;

const GroupTitle = styled.h2<IThemeProps>`
  font-size: ${({ theme }) => theme.fontSizes.s};
  color: ${({ theme }) => theme.color.black_100};
  margin-bottom: 3px;
`;

const GroupDesc = styled.p<IThemeProps>`
  display: flex;
  align-items: center;
  font-size: ${({ theme }) => theme.fontSizes.fs_3};
  color: ${({ theme }) => theme.color.gray_500};
  margin-bottom: 16px;
  .material-icons-round {
    font-size: ${({ theme }) => theme.fontSizes.fs_3};
    margin-right: 3px;
  }
`;

const MembersQtyBtn = styled(Btn)<IThemeProps>`
  color: ${({ theme }) => theme.color.primary};
  font-size: ${({ theme }) => theme.fontSizes.fs_3};
  margin-top: 2px;
  &:hover {
    text-decoration: underline;
  }
`;

interface IGroupNavBtnProps {
  active: boolean;
}

const GroupNavBtn = styled.button<IThemeProps & IGroupNavBtnProps>`
  color: ${({ active, theme: { color: { black_300, gray_500 } } }) => (active ? black_300 : gray_500)};
  font-weight: ${({ active }) => (active ? 700 : 400)};
  font-size: ${({ theme }) => theme.fontSizes.fs_3};
  background-color: ${({ active, theme: { color: { gray_400, white_100 } } }) => (active ? gray_400 : white_100)};
  border: 1px solid ${({ theme }) => theme.color.gray_400};
  box-shadow: inset ${({ active, theme }) => (active ? theme.shadow.s : '')};
  border-radius: 8px;
  transition: background-color .1s ease-in-out;
  margin-right: 10px;
  padding: 10px 30px;
  &:hover {
    filter: brightness(0.97);
  }
`;

const MemberListCard = styled(Card)<IThemeProps>`
  .title {
    font-size: ${({ theme }) => theme.fontSizes.fs_3};
    font-weight: 700;
    margin-right: 5px;
  }
  .members-qty {
    margin: 0 5px;
  }
`;

const MemberListCardHeader = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 16px;
`;

const MemberSearchGroup = styled.div`
  display: flex;
  align-items: stretch;
  margin-bottom: 16px;
`;

const MemberSearch = styled.input<IThemeProps>`
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

const MemberSearchBtn = styled(Btn)<IThemeProps>`
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

const MemberSubTitle = styled.h3`
  
`;

const MemberList = styled.ul<IThemeProps>`
  list-style: none;
`;

const MemberItem = styled.li<IThemeProps>`
  display: flex;
  align-items: center;
  border: 1px solid ${({ theme }) => theme.color.gray_400};
  border-radius: 5px;
  padding: 10px;
  margin-bottom: 10px;
`;

const MemberItemPhoto = styled.img<IThemeProps>`
  flex-shrink: 0;
  width: 50px;
  height: 50px;
  border-radius: 100%;
  box-shadow: ${({ theme }) => theme.shadow.s};
  transition: filter .1s ease-in-out;
  margin-right: 10px;
  &:hover {
    filter: brightness(0.9);
  }
`;

const MemberItemContent = styled.div<IThemeProps>`
  flex-grow: 1;
  a {
    text-decoration: none;
    color: ${({ theme }) => theme.color.primary};
    font-size: ${({ theme }) => theme.fontSizes.fs_2};
  }
  .member-desc {
    color: ${({ theme }) => theme.color.gray_300};
    font-size: ${({ theme }) => theme.fontSizes.fs_4};
  }
`;

const MemberItemBtn = styled(Btn)<IThemeProps>`
  border: 1px solid ${({ theme }) => theme.color.gray_100};
  padding: 5px 10px;
  border-radius: 5px;
  background-color: ${({ theme }) => theme.color.white_100};
  margin-right: 10px;
  .material-icons-round {
    font-size: ${({ theme }) => theme.fontSizes.fs_3};
    margin-right: 3px;
  }
`;

type CurrentDisplay = 'articles' | 'members';

const Groups: React.FC = () => {
  const [currentDisplay, setCurrentDisplay] = useState<CurrentDisplay>('articles');

  return (
    <Wrap>
      <Header>
        <BannerImg src="https://images.unsplash.com/photo-1598589290625-9b04630ec5d1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80" alt="group banner" />
        <GroupTitle>貓貓同好</GroupTitle>
        <GroupDesc>
          <span className="material-icons-round">public</span>
          公開社團 ．
          <MembersQtyBtn type="button">30</MembersQtyBtn>
          位成員
        </GroupDesc>
        <nav>
          <GroupNavBtn
            active={currentDisplay === 'articles'}
            type="button"
            onClick={() => setCurrentDisplay('articles')}
          >討論
          </GroupNavBtn>
          <GroupNavBtn
            active={currentDisplay === 'members'}
            type="button"
            onClick={() => setCurrentDisplay('members')}
          >成員
          </GroupNavBtn>
        </nav>
      </Header>
      {currentDisplay === 'articles'
       && (
       <>
         <PublishPanel />
         <Articles />
       </>
       )}
      {currentDisplay === 'members' && (
        <MemberListCard>
          <MemberListCardHeader>
            <h2 className="title">成員</h2> ．
            <p className="members-qty">30</p>
            <p>位</p>
          </MemberListCardHeader>
          <MemberSearchGroup>
            <MemberSearch placeholder="搜尋社團成員" />
            <MemberSearchBtn type="button">
              <span className="material-icons-round">search</span>
            </MemberSearchBtn>
          </MemberSearchGroup>
          <MemberSubTitle>管理員</MemberSubTitle>
          <MemberList>
            <MemberItem>
              <MemberItemPhoto src="https://images.unsplash.com/photo-1557002665-c552e1832483?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80" alt="username" />
              <MemberItemContent>
                <Link to="/user/uid">Tom Tom</Link>
                <p className="member-desc">Lorem ipsum dolor sit amet.</p>
              </MemberItemContent>
              <MemberItemBtn anime>
                <span className="material-icons-round">add</span>
                加好友
              </MemberItemBtn>
              <MemberItemBtn anime>
                <span className="material-icons-round">chat</span>
                傳訊息
              </MemberItemBtn>
            </MemberItem>
          </MemberList>
          <MemberSubTitle>成員</MemberSubTitle>
          <MemberList>
            {
              new Array(10).fill(null).map((item, idx) => (
                // eslint-disable-next-line react/no-array-index-key
                <MemberItem key={idx}>
                  <MemberItemPhoto src="https://images.unsplash.com/photo-1557002665-c552e1832483?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80" alt="username" />
                  <MemberItemContent>
                    <Link to="/user/uid">Tom Tom</Link>
                    <p className="member-desc">Lorem ipsum dolor sit amet.</p>
                  </MemberItemContent>
                  <MemberItemBtn anime>
                    <span className="material-icons-round">add</span>
                    加好友
                  </MemberItemBtn>
                  <MemberItemBtn anime>
                    <span className="material-icons-round">chat</span>
                    傳訊息
                  </MemberItemBtn>
                </MemberItem>
              ))
            }

          </MemberList>
        </MemberListCard>
      )}

    </Wrap>
  );
};

export default Groups;
