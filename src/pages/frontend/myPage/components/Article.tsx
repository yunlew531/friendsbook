import React from 'react';
import Card from 'components/Card';
import styled from '@emotion/styled';
import Btn from 'components/Btn';

const ArticleCard = styled(Card)<IThemeProps>`
  box-shadow: ${({ theme }) => theme.shadow.s};
  border-left: none;
  border-bottom: none;
  padding: 20px 0 0;
  margin-bottom: 20px;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 15px;
  padding: 0 20px;
`;

const UserPhotoContainer = styled.div<IThemeProps>`
  width: 55px;
  height: 55px;
  box-shadow: ${({ theme }) => theme.shadow.m};
  border-radius: 100%;
  padding: 2px;
  margin-right: 18px;
`;

const UserPhoto = styled.img<IThemeProps>`
  width: 100%;
  height: 100%;
  border-radius: 100%;
`;

const HeaderName = styled.p<IThemeProps>`
  font-weight: 700;
  color: ${({ theme }) => theme.color.blue_300};
  margin-bottom: 3px;
`;

const ArticleTime = styled.p<IThemeProps>`
  font-size: ${({ theme }) => theme.fontSizes.fs_5};
  color: ${({ theme }) => theme.color.gray_500};
`;

const MoreBtn = styled.button<IThemeProps>`
  align-self: flex-start;
  display: flex;
  align-items: center;
  border: none;
  background-color: ${({ theme }) => theme.color.white_100};
  border-radius: 8px;
  transition: filter .1s ease-in-out, transform .1s ease-in-out;
  margin-left: auto;
  padding: 1px 6px;
  .more-horiz-icon {
    color: ${({ theme }) => theme.color.gray_300};
  }
  &:hover {
    filter: brightness(0.9);
  }
  &:active {
    transform: scale(0.95);
  }
`;

const Content = styled.p`
  line-height: 1.5;
  margin-bottom: 20px;
  padding: 0 20px;
`;

const Footer = styled.div`
  display: flex;
  justify-content: end;
  padding: 0 20px 10px;
`;

const FooterBtn = styled(Btn)<IThemeProps>`
  position: relative;
  color: ${({ theme }) => theme.color.gray_300};
  margin: 0 6px;
  .material-icons-outlined {
    transition: transform .1s ease-in-out;
  }
  .interact-num {
    position: absolute;
    top: -5px;
    right: -3px;
  }
  &:hover {
    .material-icons-outlined {
      transform: scale(1.05);
    }
  }
`;

const CommentListContainer = styled.div<IThemeProps>`
  background-color: ${({ theme }) => theme.color.white_200};
  padding: 20px;
`;

const CommentList = styled.ul <IThemeProps>`
  list-style: none;
`;

const CommentItem = styled.li<IThemeProps>`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  border-bottom: 1px solid ${({ theme }) => theme.color.gray_400};
  padding-bottom: 5px;
  &:last-of-type {
    margin-bottom: 0;
    border-bottom: none;
  }
`;

const CommentUserPhotoContainer = styled.div<IThemeProps>`
  flex-shrink: 0;
  align-self: flex-start;
  width: 40px;
  height: 40px;
  border-radius: 100%;
  border: 2px solid ${({ theme }) => theme.color.white_100};
  margin-right: 10px;
`;

const CommentUserPhoto = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 100%;
`;

const CommentMain = styled.div`
  flex-grow: 1;
  
`;

const CommentMainHeader = styled.div`
  display: flex;
`;

const CommentMainFooter = styled.div`
  display: flex;
  align-items: center;
`;

const CommentFooterBtn = styled(Btn)<IThemeProps>`
  .material-icons-outlined {
    font-size: ${({ theme }) => theme.fontSizes.fs_3};
    color: ${({ theme }) => theme.color.gray_300};
  }
  &:hover {
    .material-icons-outlined {
      color: ${({ theme }) => theme.color.black_100};
    }
  }
`;

const CommentTime = styled.p<IThemeProps>`
  font-size: ${({ theme }) => theme.fontSizes.fs_5};
  color: ${({ theme }) => theme.color.gray_300};
  margin-right: auto;
`;

const CommentUsername = styled.p<IThemeProps>`
  color: ${({ theme }) => theme.color.primary};
  margin-right: 8px;
`;

const CommentContent = styled.p`
  
`;

const CommentMoreBtn = styled(Btn)<IThemeProps>`
  padding: 5px 2px;
  border-radius: 3px;
  transition: background-color .1s ease-in-out;
  .more-icon {
    font-size: ${({ theme }) => theme.fontSizes.fs_1};
    color: ${({ theme }) => theme.color.gray_500};
  }
  &:hover {
    background-color: ${({ theme }) => theme.color.gray_400};
  }
  &:active {
    transform: scale(0.9);
  }
`;

// eslint-disable-next-line arrow-body-style
const Article: React.FC = () => {
  return (
    <li>
      <ArticleCard>
        <Header>
          <UserPhotoContainer>
            <UserPhoto src="https://images.unsplash.com/photo-1622347379811-aa09b950bd5b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=764&q=80" />
          </UserPhotoContainer>
          <div>
            <HeaderName>Miranda Shaffer</HeaderName>
            <ArticleTime>June 21, 12:45 pm</ArticleTime>
          </div>
          <MoreBtn type="button">
            <span className="material-icons-outlined more-horiz-icon">more_horiz</span>
          </MoreBtn>
        </Header>
        <Content>
          Being a father is sometimes my hardest but always my most rewarding job.
          Happy Father’s Day to all dads out there.
        </Content>
        <Footer>
          <FooterBtn type="button" anime>
            <span className="interact-num">0</span>
            <span className="material-icons-outlined">thumb_up</span>
          </FooterBtn>
          <FooterBtn type="button" anime>
            <span className="interact-num">0</span>
            <span className="material-icons-outlined">chat</span>
          </FooterBtn>
          <FooterBtn type="button" anime>
            <span className="interact-num">0</span>
            <span className="material-icons-outlined">share</span>
          </FooterBtn>
        </Footer>
        <CommentListContainer>
          <CommentList>
            <CommentItem>
              <CommentUserPhotoContainer>
                <CommentUserPhoto src="https://images.unsplash.com/photo-1622347379811-aa09b950bd5b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=764&q=80" />
              </CommentUserPhotoContainer>
              <CommentMain>
                <CommentMainHeader>
                  <CommentUsername>Tom</CommentUsername>
                  <CommentContent>dest but always my most rewardin dedest but always my most re
                    wardinst but always my most rewardin dest but always my most rewardin
                  </CommentContent>
                </CommentMainHeader>
                <CommentMainFooter>
                  <CommentTime>2022-10-15 15:20</CommentTime>
                  <CommentFooterBtn type="button" anime>
                    <span className="material-icons-outlined">thumb_up</span>
                  </CommentFooterBtn>
                  <CommentFooterBtn type="button" anime>
                    <span className="material-icons-outlined">reply</span>
                  </CommentFooterBtn>
                </CommentMainFooter>
              </CommentMain>
              <CommentMoreBtn type="button">
                <span className="material-icons-outlined more-icon">more_vert</span>
              </CommentMoreBtn>
            </CommentItem>
          </CommentList>
        </CommentListContainer>
      </ArticleCard>
    </li>
  );
};

export default Article;
