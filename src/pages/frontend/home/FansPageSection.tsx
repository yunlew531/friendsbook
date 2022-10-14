import React from 'react';
import styled from '@emotion/styled';
import { Link } from 'react-router-dom';

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
  border: 1px dashed red;
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

const Btn = styled.button<IThemeProps>`
  display: flex;
  align-items: center;
  font-size: ${({ theme }) => theme.fontSizes.fs_3};
  font-weight: 700;
  border-radius: 10px;
  border: none;
  padding: 8px 10px;
`;

const JoinGroupBtn = styled(Btn)<IThemeProps>`
  background-color: ${({ theme }) => theme.color.gray_100};
  padding: 8px 8px 8px 15px;
  margin-left: auto;
  margin-right: 10px;
  .groups-icon {
    margin-right: 5px;
  }
`;

const InviteBtn = styled(Btn)<IThemeProps>`
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

const Member = styled.li<IThemeProps>`
  display: flex;
  align-items: center;
  border-radius: 5px;
  padding: 10px;
  box-shadow: -1px -1px 2px rgba(0, 0, 0, 0.05), ${({ theme }) => theme.shadow.s};
  background-color: ${({ theme }) => theme.color.white_100};
  &:hover {
    filter: brightness(0.98);
  }
`;

const MemberPhoto = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 100%;
  margin-right: 15px;
`;

const MemberInfo = styled.div<IThemeProps>`
  .name {
    font-size: ${({ theme }) => theme.fontSizes.fs_2};
    font-weight: 700;
  }
  .join-time {
    font-size: ${({ theme }) => theme.fontSizes.fs_4};
    color: ${({ theme }) => theme.color.gray_300};
  }
`;

const AddToFriendsBtn = styled(Btn)`
  font-size: ${({ theme }) => theme.fontSizes.fs_4};
  margin-left: auto;
  .person-add-icon {
    font-size: ${({ theme }) => theme.fontSizes.fs_3};
    margin-right: 5px;
  }
`;

const SendMessageBtn = styled(Btn)`
  font-size: ${({ theme }) => theme.fontSizes.fs_4};
  margin-left: auto;
  .chat-icon {
    font-size: ${({ theme }) => theme.fontSizes.fs_3};
    margin-right: 5px;
  }
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
          <JoinGroupBtn type="button">
            <span className="material-icons-outlined groups-icon">groups</span>
            已加入
            <span className="material-icons-outlined expand-more-icon">expand_more</span>
          </JoinGroupBtn>
          <InviteBtn type="button">
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
              <Member key={member + idx.toString()}>
                <MemberPhoto src="https://images.unsplash.com/photo-1552374196-c4e7ffc6e126?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80" />
                <MemberInfo>
                  <p className="name">Tomas</p>
                  <p className="join-time">5 個月前加入</p>
                </MemberInfo>
                {
                 idx === 3 || idx === 6 || idx === 9
                   ? (
                     <SendMessageBtn type="button">
                       <span className="material-icons-outlined chat-icon">chat</span>
                       發訊息
                     </SendMessageBtn>
                   )
                   : (
                     <AddToFriendsBtn type="button">
                       <span className="material-icons-outlined person-add-icon">person_add</span>
                       加好友
                     </AddToFriendsBtn>
                   )
                }
              </Member>
            ))
          }
        </MemberList>
      </FansPagePanel>
    </Wrap>
  );
};

export default FansPageSection;
