import React from 'react';
import styled from '@emotion/styled';
import Btn, { MoreBtn } from 'components/Btn';

const Wrap = styled.div<IThemeProps>`
  background-color: ${({ theme }) => theme.color.white_100};
  padding: 100px 150px;
`;

const Title = styled.h2<IThemeProps>`
  font-size: ${({ theme }) => theme.fontSizes.l};
  margin-bottom: 100px;
`;

const Container = styled.div`
  display: flex;
  justify-content: space-between;
`;

const SceneryList = styled.ul`
  position: relative;
  max-width: 500px;
  width: 100%;
  height: 650px;
  list-style: none;
  margin: 0 30px 0 60px;
`;

const SceneryItem = styled.li<IThemeProps & { rotate?: number }>`
  position: absolute;
  background: linear-gradient(308deg, ${({ theme }) => theme.color.gray_400}, ${({ theme }) => theme.color.gray_200});
  border-radius: 3px;
  box-shadow: ${({ theme }) => theme.shadow.m};
  padding: 40px 30px 100px;
  transform: rotate(${({ rotate = 0 }) => rotate}deg);
  img {
    position: relative;
    height: 450px;
    border: 1px solid ${({ theme }) => theme.color.gray_100};
  }
`;

const ArticleList = styled.ul`
  max-width: 800px;
  width: 100%;
  margin: 0 30px 0 60px;
`;

const ArticleItem = styled.li<IThemeProps>`
  list-style: none;
  padding: 30px;
  background-color: ${({ theme }) => theme.color.white_100};
  box-shadow: ${({ theme }) => theme.shadow.m};
  border-radius: 8px;
  margin-bottom: 30px;
`;

const ArticleHeader = styled.div`
  display: flex;
  justify-content: space-between;
`;

const ArticleHeaderUser = styled.div`
  display: flex;
`;

const ArticleHeaderUserPhoto = styled.img<IThemeProps>`
  height: 60px;
  width: 60px;
  border-radius: 100%;
  padding: 3px;
  background-color: ${({ theme }) => theme.color.white_100};
  box-shadow: ${({ theme }) => theme.shadow.m};
  margin-right: 20px;
`;

const ArticleHeaderUserNameGroup = styled.div<IThemeProps>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  .name {
    font-size: ${({ theme }) => theme.fontSizes.fs_2};
    font-weight: 700;
    margin-bottom: 2px;
  }
  .time {
    font-size: ${({ theme }) => theme.fontSizes.fs_5};
    color: ${({ theme }) => theme.color.gray_300};
    font-weight: 300;
  }
`;

const ArticleMoreBtn = styled(MoreBtn)<IThemeProps>`
  align-self: flex-start;
  background-color: ${({ theme }) => theme.color.white_100};
`;

const ArticleMain = styled.div`
  padding: 30px 0;
  p {
    margin-bottom: 30px;
  }
  img {
    max-width: 500px;
    height: 300px;
    border-radius: 10px;
  }
`;

const ArticleFooter = styled.div`
  text-align: end;
`;

const ArticleBtn = styled(Btn)`
  margin-right: 20px;
  transition: transform .1s ease-in-out;
  &:hover {
    transform: scale(1.1);
  }
  &:active {
    transform: scale(0.95);
  }
  span {
    font-size: 25px;
  }
  &:last-of-type {
    margin-right: 0;
  }
`;

// eslint-disable-next-line arrow-body-style
const ScenerySection: React.FC = () => {
  return (
    <Wrap>
      <Title>????????????????????????</Title>
      <Container>
        <SceneryList>
          <SceneryItem>
            <img src={`${process.env.PUBLIC_URL}/images/message-wall-bg.jpeg`} alt="scenery" />
          </SceneryItem>
          <SceneryItem rotate={2}>
            <img src={`${process.env.PUBLIC_URL}/images/message-wall-bg.jpeg`} alt="scenery" />
          </SceneryItem>
          <SceneryItem rotate={-2}>
            <img src={`${process.env.PUBLIC_URL}/images/message-wall-bg.jpeg`} alt="scenery" />
          </SceneryItem>
        </SceneryList>
        <ArticleList>
          {
           new Array(3).fill(null).map((item, idx) => (
             <ArticleItem key={item + idx.toString()}>
               <ArticleHeader>
                 <ArticleHeaderUser>
                   <ArticleHeaderUserPhoto src="https://images.unsplash.com/photo-1582152629442-4a864303fb96?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80" />
                   <ArticleHeaderUserNameGroup>
                     <p className="name">Tomas</p>
                     <p className="time">45 ?????????</p>
                   </ArticleHeaderUserNameGroup>
                 </ArticleHeaderUser>
                 <ArticleMoreBtn anime>
                   <span className="material-icons-outlined">more_horiz</span>
                 </ArticleMoreBtn>
               </ArticleHeader>
               <ArticleMain>
                 <p>?????????????????????????????????</p>
                 <img src={`${process.env.PUBLIC_URL}/images/message-wall-bg.jpeg`} alt="scenery" />
               </ArticleMain>
               <ArticleFooter>
                 <ArticleBtn type="button" anime><span className="material-icons-outlined">thumb_up</span></ArticleBtn>
                 <ArticleBtn type="button" anime><span className="material-icons-outlined">textsms</span></ArticleBtn>
                 <ArticleBtn type="button" anime><span className="material-icons-outlined">share</span></ArticleBtn>
               </ArticleFooter>
             </ArticleItem>
           ))
          }
        </ArticleList>
      </Container>
    </Wrap>
  );
};

export default ScenerySection;
