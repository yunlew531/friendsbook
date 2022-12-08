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
import { useLazyGetUserByTokenQuery, useRegisterMutation } from 'services/user';
import { useAppDispatch, useAppSelector } from 'hooks';
import { getProfile } from 'slices/userInfoSlice';

const Wrap = styled.div<IThemeProps>`
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
  const dispatch = useAppDispatch();
  const userInfo = useAppSelector((state) => state.userInfo);
  const [currentCardDisplay, setCurrentCardDisplay] = useState<CurrentCardDisplay>('login');
  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const [registerData, setRegisterData] = useState({ email: '', password: '', name: '' });
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [loginTrigger, loginResult] = useLoginMutation();
  const [registerTrigger, registerResult] = useRegisterMutation();
  const [getUserByTokenTrigger, userResult] = useLazyGetUserByTokenQuery();

  useEffect(() => {
    if (userInfo.isLogin) navigate('/');
  }, [userInfo.isLogin]);

  useEffect(() => {
    const handleLogin = () => {
      const { isSuccess, isLoading, data } = loginResult;
      if (!isSuccess || isLoading) return;
      const { token } = data;
      Cookies.set('Friendsbook', token, { expires: 7 });
      getUserByTokenTrigger();
    };

    handleLogin();
  }, [loginResult]);

  useEffect(() => {
    if (userResult.isSuccess) {
      dispatch(getProfile(userResult.data.profile));
      navigate('/');
      toast.success('成功登入!');
    }
  }, [userResult]);

  useEffect(() => {
    const handleRegister = () => {
      const { isSuccess, isLoading } = registerResult;
      if (!isSuccess || isLoading) return;
      toast.success('註冊成功!');
    };

    handleRegister();
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
                <form onSubmit={handleSubmit(() => loginTrigger(loginData))}>
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
                  registerTrigger(data as Required<Pick<IProfile, 'name' | 'email' | 'password'>>);
                })}
                >
                  <InputGroup errors={errors.name}>
                    <input
                      type="text"
                      placeholder="請輸入姓名"
                      value={registerData.name}
                      {...register('name', { required: '姓名為必填!', minLength: { value: 2, message: '至少要2個字!' } })}
                      onChange={(
                        e: React.ChangeEvent<HTMLInputElement>,
                      ) => setRegisterData((prev) => ({ ...prev, name: e.target.value }))}
                    />
                    {errors.name && <span className="error-msg">{errors.name.message as string}</span>}
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
