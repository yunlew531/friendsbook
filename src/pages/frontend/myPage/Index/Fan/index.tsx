import React from 'react';
import styled from '@emotion/styled';
import Card from 'components/Card';
import Articles from 'pages/frontend/MyPage/components/Articles';

const Wrap = styled.div`
  display: flex;
`;

const Aside = styled.aside`
  flex-shrink: 0;
  width: 450px;
  margin-right: 20px;
`;

const AsideContent = styled.div`
  position: sticky;
  top: 100px;
`;

const Introduce = styled(Card)<IThemeProps>`
  margin-bottom: 20px;
  .title {
    font-weight: 700; 
    font-size: ${({ theme }) => theme.fontSizes.fs_2};
    color: ${({ theme }) => theme.color.blue_300};
    margin-bottom: 10px;
  }
`;

const ImagesContainer = styled(Card)`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 3px;
  img {
    height: 130px;
    border-radius: 3px;
  }
`;

const Main = styled.main`
  ul {
    margin: 0;
  }
`;

// eslint-disable-next-line arrow-body-style
const FanIndex: React.FC = () => {
  return (
    <Wrap>
      <Aside>
        <AsideContent>
          <Introduce>
            <h4 className="title">簡介</h4>
            <p>偶像偶像偶像偶像偶像偶像偶像偶像偶像偶像偶像偶像</p>
          </Introduce>
          <ImagesContainer>
            <img src="https://images.unsplash.com/photo-1561948955-570b270e7c36?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=601&q=80" alt="" />
            <img src="https://images.unsplash.com/photo-1561948955-570b270e7c36?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=601&q=80" alt="" />
            <img src="https://images.unsplash.com/photo-1561948955-570b270e7c36?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=601&q=80" alt="" />
            <img src="https://images.unsplash.com/photo-1561948955-570b270e7c36?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=601&q=80" alt="" />
            <img src="https://images.unsplash.com/photo-1561948955-570b270e7c36?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=601&q=80" alt="" />
            <img src="https://images.unsplash.com/photo-1561948955-570b270e7c36?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=601&q=80" alt="" />
          </ImagesContainer>
        </AsideContent>
      </Aside>
      <Main>
        <Articles />
      </Main>
    </Wrap>
  );
};

export default FanIndex;
