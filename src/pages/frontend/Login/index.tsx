import styled from '@emotion/styled';
import Card from 'components/Card';
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  FieldError, FieldErrorsImpl, Merge, useForm,
} from 'react-hook-form';
import { useLoginMutation } from 'services/account';
import toast from 'react-hot-toast';
import Cookies from 'js-cookie';
import { useRegisterMutation } from 'services/user';

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

const LoginAndRegisterCard = styled(Card)<IThemeProps>`
  border-radius: 20px;
  box-shadow: ${({ theme }) => theme.shadow.s};
  padding: 55px 50px;
  h2 {
    margin-bottom: 30px;
  }
`;

interface IInputGroupProps {
  errors?: FieldError | Merge<FieldError, FieldErrorsImpl<any>> | undefined;
}

const InputGroup = styled.div<IThemeProps & IInputGroupProps>`
  height: 65px;
  input {
    width: 100%;
    border: 1px solid ${({ errors, theme }) => (errors ? 'transparent' : theme.color.gray_100)};
    outline: 1px solid ${({ errors, theme }) => (errors ? theme.color.red_100 : 'none')};
    border-radius: 5px;
    padding: 10px 15px;
  }
  .error-msg {
    font-size: ${({ theme }) => theme.fontSizes.fs_5};
    color: ${({ theme }) => theme.color.red_100};
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
  const navigate = useNavigate();
  const [currentCardDisplay, setCurrentCardDisplay] = useState<CurrentCardDisplay>('login');
  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const [registerData, setRegisterData] = useState({ email: '', password: '', username: '' });
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [login, loginResult] = useLoginMutation();
  const [registerTrigger, registerResult] = useRegisterMutation();

  useEffect(() => {
    const {
      isSuccess, error, data, isUninitialized, isLoading,
    } = loginResult;
    const handleLogin = () => {
      enum LoginError {
        '信箱必須填寫' = 1,
        '密碼必須填寫' = 2,
        '密碼至少要6字' = 3,
        '用戶不存在，請檢查信箱是否正確' = 4,
        '密碼錯誤' = 5,
      }

      if (isSuccess) {
        const { token } = data;
        Cookies.set('Friendsbook', token);
        navigate('/');
        toast.success('成功登入!');
      } else if (error && 'data' in error) toast.error(LoginError[error.data.code]);
      else if (!isLoading) toast.error('登入失敗!請稍候再嘗試');
    };

    if (!isUninitialized) handleLogin();
  }, [loginResult]);

  useEffect(() => {
    const {
      isSuccess, error, isUninitialized, isLoading,
    } = registerResult;
    const handleRegister = () => {
      enum RegisterError {
        '此信箱已註冊過' = 1,
        '用戶名必須填寫' = 2,
        '信箱必須填寫' = 3,
        '密碼必須填寫' = 4,
        '信箱格式錯誤' = 6,
        '用戶名至少要2字' = 8,
        '密碼至少要6字' = 9,
      }

      if (isSuccess) toast.success('註冊成功!');
      else if (error && 'data' in error) toast.error(RegisterError[error.data.code]);
      else if (!isLoading) toast.error('註冊失敗!請稍候再嘗試');
    };

    if (!isUninitialized) handleRegister();
  }, [registerResult]);

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
              <LoginAndRegisterCard>
                <h2>登入</h2>
                <form onSubmit={handleSubmit(() => login(loginData))}>
                  <InputGroup errors={errors.loginEmail}>
                    <input
                      type="email"
                      placeholder="請輸入 Email"
                      value={loginData.email}
                      {...register('loginEmail', { required: 'Email 為必填!' })}
                      onChange={(
                        e: React.ChangeEvent<HTMLInputElement>,
                      ) => setLoginData((prev) => ({ ...prev, email: e.target.value }))}
                    />
                    {errors.loginEmail && <span className="error-msg">{errors.loginEmail.message as string}</span>}
                  </InputGroup>
                  <InputGroup errors={errors.loginPassword}>
                    <input
                      type="password"
                      placeholder="請輸入密碼"
                      value={loginData.password}
                      {...register('loginPassword', { required: '密碼為必填!', minLength: { value: 6, message: '至少要6個字!' } })}
                      onChange={(
                        e: React.ChangeEvent<HTMLInputElement>,
                      ) => setLoginData((prev) => ({ ...prev, password: e.target.value }))}
                    />
                    {errors.loginPassword && <span className="error-msg">{errors.loginPassword.message as string}</span>}
                  </InputGroup>
                  <ForgetPwdLink to="/login/reset">忘記密碼了嗎?</ForgetPwdLink>
                  <Btn type="submit">登入</Btn>
                </form>
                <CardFooter>
                  <p>還沒有帳戶?</p>
                  <ImmediateBtn
                    type="button"
                    onClick={() => setCurrentCardDisplay('register')}
                  >立即註冊
                  </ImmediateBtn>
                </CardFooter>
              </LoginAndRegisterCard>
            )
            : (
              <LoginAndRegisterCard>
                <h2>註冊</h2>
                <form onSubmit={handleSubmit(() => {
                  const data: { [key: string]: string } = registerData;
                  const dataKeys = Object.keys(data);
                  dataKeys.forEach((key) => { data[key] = data[key].trim(); });
                  registerTrigger(data as Required<Pick<IUser, 'username' | 'email' | 'password'>>);
                })}
                >
                  <InputGroup errors={errors.username}>
                    <input
                      type="text"
                      placeholder="請輸入暱稱"
                      value={registerData.username}
                      {...register('username', { required: '暱稱為必填!', minLength: { value: 2, message: '至少要2個字!' } })}
                      onChange={(
                        e: React.ChangeEvent<HTMLInputElement>,
                      ) => setRegisterData((prev) => ({ ...prev, username: e.target.value }))}
                    />
                    {errors.username && <span className="error-msg">{errors.username.message as string}</span>}
                  </InputGroup>
                  <InputGroup errors={errors.registerEmail}>
                    <input
                      type="email"
                      placeholder="請輸入 Email"
                      value={registerData.email}
                      {...register('registerEmail', { required: 'Email 為必填!' })}
                      onChange={(
                        e: React.ChangeEvent<HTMLInputElement>,
                      ) => setRegisterData((prev) => ({ ...prev, email: e.target.value }))}
                    />
                    {errors.registerEmail && <span className="error-msg">{errors.registerEmail.message as string}</span>}
                  </InputGroup>
                  <InputGroup errors={errors.registerPassword}>
                    <input
                      type="password"
                      placeholder="請輸入密碼"
                      value={registerData.password}
                      {...register('registerPassword', { required: '密碼為必填!', minLength: { value: 6, message: '至少要6個字!' } })}
                      onChange={(
                        e: React.ChangeEvent<HTMLInputElement>,
                      ) => setRegisterData((prev) => ({ ...prev, password: e.target.value }))}
                    />
                    {errors.registerPassword && <span className="error-msg">{errors.registerPassword.message as string}</span>}
                  </InputGroup>
                  <RegisterBtn type="submit">註冊</RegisterBtn>
                </form>
                <CardFooter>
                  <p>已經擁有帳戶?</p>
                  <ImmediateBtn
                    type="button"
                    onClick={() => setCurrentCardDisplay('login')}
                  >點此登入
                  </ImmediateBtn>
                </CardFooter>
              </LoginAndRegisterCard>
            )}
        </CardContainer>
      </MainSection>
    </Wrap>
  );
};

export default Login;
