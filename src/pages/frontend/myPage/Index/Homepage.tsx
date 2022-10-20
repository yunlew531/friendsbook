import styled from '@emotion/styled';
import React from 'react';

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
    font-size: ${({ theme }) => theme.fontSizes.s};
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

const FriendItemPhoto = styled.div<IThemeProps>`
  width: 40px;
  height: 40px;
  border-radius: 100%;
  border: 1px solid ${({ theme }) => theme.color.green_100};
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

// eslint-disable-next-line arrow-body-style
const Homepage: React.FC = () => {
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
            new Array(10).fill(null).map(() => (
              <FriendItem>
                <FriendItemPhoto>
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
    </Wrap>
  );
};

export default Homepage;
