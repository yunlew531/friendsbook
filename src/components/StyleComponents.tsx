import styled from '@emotion/styled';
import Btn from 'components/Btn';
import Card from 'components/Card';

export const ArticleCard = styled(Card)<IThemeProps>`
  overflow: hidden;
  box-shadow: ${({ theme }) => theme.shadow.s};
  border: 1px solid ${({ theme }) => theme.color.gray_200};
  border-bottom: none;
  padding: 20px 0 0;
  .photo-skeleton, .input-skeleton {
    margin-right: 15px;
  }
  .comment-skeleton {
    margin-bottom: 16px;
  }
  .footer-btn {
    margin-right: 10px;
    &:last-of-type {
      margin-right: 0;
    }
  }
  .input-skeleton {
    flex-grow: 1;
  }
`;

export const ArticleHeader = styled.div<IThemeProps>`
  display: flex;
  align-items: center;
  margin-bottom: 15px;
  padding: 0 20px;
  a {
    display: inline-block;
    font-weight: 700;
    text-decoration: none;
    cursor: default;
    color: ${({ theme }) => theme.color.blue_300};
    margin-bottom: 3px;
    transition: color .1s ease-in-out;
    &:hover {
      color: ${({ theme }) => theme.color.primary};
    }
  }
`;

export const UserPhoto = styled.img<IThemeProps>`
  width: 55px;
  height: 55px;
  box-shadow: ${({ theme }) => theme.shadow.m};
  border-radius: 100%;
  padding: 2px;
  margin-right: 18px;
  border-radius: 100%;
  transition: filter .1s ease-in-out;
  &:hover {
    filter: brightness(0.9);
  }
`;

export const ArticleTime = styled.p<IThemeProps>`
  font-size: ${({ theme }) => theme.fontSizes.fs_5};
  color: ${({ theme }) => theme.color.gray_500};
`;

export const MoreBtnContainer = styled.div`
  position: relative;
  align-self: flex-start;
  margin-left: auto;
  &:hover {
    .more-btn {
      filter: brightness(0.9);
    }
  }
`;

export const ArticleMoreList = styled.ul<IThemeProps>`
  width: 80px;
  position: absolute;
  bottom: -2px;
  right: 0;
  z-index: 10;
  overflow: hidden;
  transform: translateY(100%);
  border: 1px solid ${({ theme }) => theme.color.gray_400};
  box-shadow: ${({ theme }) => theme.shadow.m};
  background-color: ${({ theme }) => theme.color.white_100};
  border-radius: 8px;
  list-style: none;
  li {
    border-bottom: 1px solid ${({ theme }) => theme.color.gray_400};
    text-align: center;
    &:last-of-type {
      border-bottom: none;
    }
    button {
      border: none;
      width: 100%;
      background-color: ${({ theme }) => theme.color.white_100};
      font-size: ${({ theme }) => theme.fontSizes.fs_4};
      color: ${({ theme }) => theme.color.black_300};
      font-weight: 700;
      padding: 10px;
      &:hover {
        filter: brightness(0.97);
      }
      &:active {
        filter: brightness(0.95);
      }
    }
    .delete-article-btn{
      color: ${({ theme }) => theme.color.red_100};
    }
  }
`;

export const MoreBtn = styled.button<IThemeProps>`
  position: relative;
  display: flex;
  align-items: center;
  border: none;
  background-color: ${({ theme }) => theme.color.white_100};
  border-radius: 8px;
  transition: filter .1s ease-in-out, transform .1s ease-in-out;
  padding: 1px 6px;
  cursor: default;
  .more-horiz-icon {
    color: ${({ theme }) => theme.color.gray_300};
  }
  &:active {
    transform: scale(0.95);
  }
  &::before {
    content: '';
    position: absolute;
    width: 100%;
    height: 100%;
    top: 50%;
    left: 0;
  }
`;

export const ArticleContent = styled.div<IThemeProps>`
  line-height: 1.5;
  margin-bottom: 20px;
  padding: 0 25px;
  .ql-editor {
    p {
      font-size: ${({ theme }) => theme.fontSizes.fs_3};
    }
    padding: 0;
  }
`;

export const ArticleFooter = styled.div`
  display: flex;
  justify-content: end;
  padding: 0 20px 10px;
  margin-top: 5px;
`;

export const ThumbsUpBtnContainer = styled.div`
  position: relative;
`;

export const ThumbsUpUsersContainer = styled.div<IThemeProps & { show: boolean }>`
  visibility: ${({ show }) => (show ? 'visible' : 'hidden')};
  opacity: ${({ show }) => (show ? 1 : 0)};
  display: flex;
  align-items: center;
  position: absolute;
  top: calc(-100% - 30px);
  left: 50%;
  box-shadow: ${({ theme }) => theme.shadow.s};
  background-color: ${({ theme }) => theme.color.white_100};
  border: 1px dashed red;
  border-radius: 8px;
  border: 1px solid ${({ theme }) => theme.color.gray_400};
  transform: translateX(-50%);
  padding: 8px;
  transition: visibility .2s, opacity .2s ease-in-out;
  &::before {
    content: '';
    position: absolute;
    bottom: -10px;
    left: 0;
    height: 10px;
    width: 100%;
  }
`;

export const ThumbsUpUser = styled.div`
  display: flex;
  align-items: center;
  &.thumbs-up-user{
    transition: transform 0.1s ease-in-out;
    &:hover {
      transform: scale(0.95);
    }
  }
  img {
    width: 30px;
    height: 30px;
    border-radius: 100%;
  }
`;

interface IFooterBtnProps {
  active?: boolean;
}

export const FooterBtn = styled(Btn)<IThemeProps & IFooterBtnProps>`
  position: relative;
  color: ${({ theme }) => theme.color.gray_300};
  margin: 0 6px;
  .thumbs-up-icon {
    transition: transform .1s ease-in-out;
    font-size: ${({ theme }) => theme.fontSizes.fs_1};
    color: ${({ theme: { color: { primary } }, active }) => (active ? primary : 'default')}
  }
  .material-icons-outlined {
    display: ${({ active }) => (active ? 'none' : 'block')};
  }
  .material-icons {
    display: ${({ active }) => (active ? 'block' : 'none')};
  }
  .interact-num {
    position: absolute;
    top: -5px;
    right: -3px;
  }
  &:hover {
    .thumbs-up-icon {
      transform: scale(1.05);
    }
  }
`;

export const CommentListContainer = styled.div<IThemeProps>`
  background-color: ${({ theme }) => theme.color.white_200};
  padding: 20px;
`;

export const CommentList = styled.ul <IThemeProps>`
  list-style: none;
`;

export const SalesDetail = styled.div<IThemeProps>`
  display: flex;
  align-items: center;
  background-color: ${({ theme }) => theme.color.gray_200};
  border: 1px solid ${({ theme }) => theme.color.gray_100};
  margin: 0 20px 20px;
  padding: 10px 20px;
`;

export const SalesMain = styled.div<IThemeProps>`
  span {
    display: inline-block;
    font-size: ${({ theme }) => theme.fontSizes.fs_3};
    margin-bottom: 3px;
    &:first-of-type {
      font-weight: 700;
      color: ${({ theme }) => theme.color.primary};
    }
    &:nth-of-type(2) {
      margin-left: 5px;
      color: ${({ theme }) => theme.color.gray_500};
    }
  }
`;

export const SendMsgBtn = styled(Btn)<IThemeProps>`
  display: flex;
  align-items: center;
  background-color: ${({ theme }) => theme.color.secondary};
  border-radius: 8px;
  color: ${({ theme }) => theme.color.white_100};
  font-weight: 700;
  padding: 6px 10px;
  margin-left: auto;
  .material-icons-outlined {
    margin-right: 3px;
    font-size: ${({ theme }) => theme.fontSizes.fs_3};
  }
`;

export const InputSection = styled.div<IThemeProps>`
  display: flex;
  align-items: center;
  border-top: 1px solid ${({ theme }) => theme.color.gray_400};
  background-color: ${({ theme }) => theme.color.gray_200};
  padding: 10px 20px;
  img {
    width: 30px;
    height: 30px;
    box-shadow: ${({ theme }) => theme.shadow.m};
    border-radius: 100%;
    margin-right: 16px;
  }
  input {
    flex-grow: 1;
    border: 1px solid ${({ theme }) => theme.color.gray_300};
    margin-right: 10px;
    padding: 5px 10px;
    border-radius: 5px;
    &:focus {
      border: 1px solid transparent;
      outline: 1px solid ${({ theme }) => theme.color.primary};
    }
  }
`;

export const PostCommentBtn = styled(Btn)<IThemeProps>`
  background-color: ${({ theme }) => theme.color.primary};
  color: ${({ theme }) => theme.color.white_100};
  border-radius: 5px;
  padding: 5px 10px;
`;
