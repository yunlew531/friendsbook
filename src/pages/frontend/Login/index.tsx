import styled from '@emotion/styled';
import Card from 'components/Card';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Wrap = styled.div<IThemeProps>`
  min-height: 100vh;
  overflow: hidden;
  background-color: ${({ theme }) => theme.color.orange_100};
  padding: 30px 50px;
`;

const Header = styled.header`
  display: flex;
  justify-content: space-between;
`;

const LogoLink = styled(Link)<IThemeProps>`
  display: flex;
  align-items: center;
  text-decoration: none;
  font-family: 'Exo 2', sans-serif;
  color: ${({ theme }) => theme.color.black_100};
  img {
    width: 30px;
    height: 30px;
    margin-right: 5px;
  }
`;

const LogoTitle = styled.h1<IThemeProps>`
  margin: 0;
  font-size: ${({ theme }) => theme.fontSizes.s};
`;

const MainSection = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: calc(100vh - 94.5px);
`;

const PeopleImg = styled.img`
  flex-shrink: 1;
  max-width: 700px;
`;

const CardContainer = styled.div`
  flex-shrink: 0;
  max-width: 450px;
  width: 100%;
  margin-left: 150px;
`;

const CardDefault = styled(Card)<IThemeProps>`
  border-radius: 20px;
  box-shadow: ${({ theme }) => theme.shadow.s};
  padding: 55px 50px;
  h2 {
    margin-bottom: 30px;
  }
  input {
    display: block;
    width: 100%;
    border: 1px solid ${({ theme }) => theme.color.gray_100};
    border-radius: 5px;
    margin-bottom: 15px;
    padding: 10px 15px;
  }
`;

const ForgetPwdLink = styled(Link)<IThemeProps>`
  display: block;
  text-decoration: none;
  color: ${({ theme }) => theme.color.primary};
  font-size: ${({ theme }) => theme.fontSizes.fs_5};
  margin-bottom: 30px;
`;

const Btn = styled.button<IThemeProps>`
  width: 100%;
  font-size: ${({ theme }) => theme.fontSizes.fs_2};
  font-weight: 700;
  color: ${({ theme }) => theme.color.white_100};
  background-color: ${({ theme }) => theme.color.primary};
  border: none;
  border-radius: 10px;
  padding: 10px 15px;
  margin-bottom: 20px;
`;

const RegisterBtn = styled(Btn)`
  margin-top: 20px;
`;

const CardFooter = styled.div<IThemeProps>`
  display: flex;
  justify-content: center;
  font-size: ${({ theme }) => theme.fontSizes.fs_4};
`;

const ImmediateBtn = styled.button<IThemeProps>`
  font-weight: 700;
  color: ${({ theme }) => theme.color.primary};
  border: none;
  background-color: transparent;
`;

type CurrentCardDisplay = 'login' | 'register';

const Login: React.FC = () => {
  const [currentCardDisplay, setCurrentCardDisplay] = useState<CurrentCardDisplay>('login');
  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const [registerData, setRegisterData] = useState({ email: '', password: '', username: '' });

  return (
    <Wrap>
      <Header>
        <LogoLink to="/home">
          <img src={`${process.env.PUBLIC_URL}/images/friends.png`} alt="friends logo" />
          <LogoTitle>Friendsbook</LogoTitle>
        </LogoLink>
      </Header>
      <MainSection>
        <PeopleImg src={`${process.env.PUBLIC_URL}/images/people.png`} />
        <CardContainer>
          {currentCardDisplay === 'login'
            ? (
              <CardDefault>
                <h2>登入</h2>
                <input
                  type="email"
                  placeholder="請輸入 Email"
                  value={loginData.email}
                  onChange={(
                    e: React.ChangeEvent<HTMLInputElement>,
                  ) => setLoginData((prev) => ({ ...prev, email: e.target.value }))}
                />
                <input
                  type="password"
                  placeholder="請輸入密碼"
                  value={loginData.password}
                  onChange={(
                    e: React.ChangeEvent<HTMLInputElement>,
                  ) => setLoginData((prev) => ({ ...prev, password: e.target.value }))}
                />
                <ForgetPwdLink to="/login/reset">忘記密碼了嗎?</ForgetPwdLink>
                <Btn type="button">登入</Btn>
                <CardFooter>
                  <p>還沒有帳戶?</p>
                  <ImmediateBtn
                    type="button"
                    onClick={() => setCurrentCardDisplay('register')}
                  >立即註冊
                  </ImmediateBtn>
                </CardFooter>
              </CardDefault>
            )
            : (
              <CardDefault>
                <h2>註冊</h2>
                <input
                  type="text"
                  placeholder="請輸入暱稱"
                  value={registerData.username}
                  onChange={(
                    e: React.ChangeEvent<HTMLInputElement>,
                  ) => setRegisterData((prev) => ({ ...prev, username: e.target.value }))}
                />
                <input
                  type="email"
                  placeholder="請輸入 Email"
                  value={registerData.email}
                  onChange={(
                    e: React.ChangeEvent<HTMLInputElement>,
                  ) => setRegisterData((prev) => ({ ...prev, email: e.target.value }))}
                />
                <input
                  type="password"
                  placeholder="請輸入密碼"
                  value={registerData.password}
                  onChange={(
                    e: React.ChangeEvent<HTMLInputElement>,
                  ) => setRegisterData((prev) => ({ ...prev, password: e.target.value }))}
                />
                <RegisterBtn type="button">註冊</RegisterBtn>
                <CardFooter>
                  <p>已經擁有帳戶?</p>
                  <ImmediateBtn
                    type="button"
                    onClick={() => setCurrentCardDisplay('login')}
                  >點此登入
                  </ImmediateBtn>
                </CardFooter>
              </CardDefault>
            )}
        </CardContainer>
      </MainSection>
    </Wrap>
  );
};

export default Login;
