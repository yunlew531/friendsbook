import React, { useState } from 'react';
import styled from '@emotion/styled';
import QuillEditor from 'pages/frontend/myPage/components/QuillEditor';
import ArticleList from 'pages/frontend/myPage/components/Articles';
import Card from 'components/Card';

const Wrap = styled.div<IThemeProps>`
  display: flex;
  background-color: ${({ theme }) => theme.bgColor};
`;

const Contact = styled.div`
  width: 100%;
  max-width: 274px;
`;

const ContactHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ContactTitle = styled.h2<IThemeProps>`
  color: ${({ theme }) => theme.color.black_300};
  font-size: ${({ theme }) => theme.fontSizes.fs_2};
`;

const ContactMoreBtn = styled.button<IThemeProps>`
  display: flex;
  align-items: center;
  border: none;
  border-radius: 10px;
  background-color: ${({ theme }) => theme.bgColor};
  transition: background-color .2s ease-in-out, transform .1s ease-in-out;
  .more-horiz-icon {
    font-size: ${({ theme }) => theme.fontSizes.fs_1};
    color: ${({ theme }) => theme.color.gray_500}
  }
  &:hover {
    filter: brightness(0.95);
  }
  &:active {
    transform: scale(0.95);
  }
`;

const FriendList = styled.ul<IThemeProps>`
  list-style: none;
  border-radius: 8px;
  border: 1px solid ${({ theme }) => theme.color.gray_400};
  margin-top: 15px;
`;

const FriendItem = styled.li<IThemeProps>`
  display: flex;
  align-items: center;
  background-color: ${({ theme }) => theme.cardColor};  
  border-bottom: 1px solid ${({ theme }) => theme.color.gray_400};
  padding: 11px 23px;
  &:first-of-type {
    border-radius: 8px 8px 0 0;
  }
  &:last-of-type {
    border-radius: 0 0 8px 8px;
    border-bottom: none;
  }
  &:hover {
    filter: brightness(0.95);
  }
  &:active {
    filter: brightness(0.9);
  }
`;

const FriendItemPhoto = styled.div<IThemeProps & { online: boolean }>`
  width: 40px;
  height: 40px;
  border-radius: 100%;
  border: 2px solid ${({ online, theme: { color: { green_100 } } }) => (online ? green_100 : 'transparent')};
  overflow: hidden;
  margin-right: 15px;
  img {
    width: 100%;
    height: 100%;
    border-radius: 100%;
    border: 1px solid ${({ theme }) => theme.color.white_100};
  }
`;

const FriendItemContent = styled.p<IThemeProps>`
  font-size: ${({ theme }) => theme.fontSizes.fs_4};
  color: ${({ theme }) => theme.color.gray_500};
  cursor: default;
`;

const MainContent = styled.main`
  flex-grow: 1;
  display: flex;
  justify-content: center;
`;

const ArticlesSection = styled.div`
  max-width: 800px;
  width: 100%;
  min-width: 380px;
  margin: 0 30px;
`;

const PublishPanel = styled(Card)``;

const PublishPanelHeader = styled.div<IThemeProps>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  p {
    color: ${({ theme }) => theme.color.gray_500};
  }
  .expand-less-icon, .expand-more-icon, p {
    cursor: default;
  }
`;

const PublicPanelFooter = styled.div<{ show:boolean }>`
  display: ${({ show }) => (show ? 'flex' : 'none')};
  justify-content: end;
`;

const PublishBtn = styled.button<IThemeProps>`
  display: flex;
  align-items: center;
  color: ${({ theme }) => theme.color.gray_200};
  border-radius: 5px;
  border: none;
  box-shadow: ${({ theme }) => theme.shadow.s};
  background-color: ${({ theme }) => theme.color.secondary};
  transition: filter .2s ease-in-out, transform .2s ease-in-out;
  padding: 5px 15px;
  .send-icon {
    margin-left: 5px;
    font-size: ${({ theme }) => theme.fontSizes.fs_4};
  }
  &:hover {
    filter: brightness(0.97);
  }
  &:active {
    transform: scale(0.95);
  }
`;

const StoriesSection = styled.div`
  flex-shrink: 0;
  width: 360px;
  border: 1px dashed red;
`;

const Homepage: React.FC = () => {
  const [isPublishShow, setIsPublishShow] = useState(false);

  return (
    <Wrap>
      <Contact>
        <ContactHeader>
          <ContactTitle>朋友</ContactTitle>
          <ContactMoreBtn type="button">
            <span className="material-icons-outlined more-horiz-icon">more_horiz</span>
          </ContactMoreBtn>
        </ContactHeader>
        <FriendList>
          {
            new Array(30).fill(null).map((item, idx) => (
              // eslint-disable-next-line react/no-array-index-key
              <FriendItem key={idx}>
                <FriendItemPhoto online={idx !== 3}>
                  {/* TODO: change alt */}
                  <img
                    src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
                    alt="friend"
                  />
                </FriendItemPhoto>
                <FriendItemContent>Bradyn Kramer</FriendItemContent>
              </FriendItem>
            ))
          }
        </FriendList>
      </Contact>
      <MainContent>
        <ArticlesSection>
          <PublishPanel>
            <PublishPanelHeader onClick={() => setIsPublishShow(!isPublishShow)}>
              <div />
              <p>Tom , 你想發佈些什麼 ?</p>
              {isPublishShow ? <span className="material-icons-outlined expand-less-icon">expand_less</span>
                : <span className="material-icons-outlined expand-more-icon">expand_more</span>}
            </PublishPanelHeader>
            <QuillEditor isPublishShow={isPublishShow} />
            <PublicPanelFooter show={isPublishShow}>
              <PublishBtn type="button">發佈
                <span className="material-icons-outlined send-icon">send</span>
              </PublishBtn>
            </PublicPanelFooter>
          </PublishPanel>
          <ArticleList />
        </ArticlesSection>
      </MainContent>
      <StoriesSection>動態</StoriesSection>
    </Wrap>
  );
};

export default Homepage;
