import { useState } from 'react';
import { InputField } from 'src/components/input';
import styled from 'styled-components';
import { FaUser, FaLock } from 'react-icons/fa';
import { Button } from 'src/components/button';
import { userAvatar } from 'src/config/images';
import { useNavigate } from 'react-router-dom';

export const SignIn = () => {
  const [state, setState] = useState({
    email: '',
    emailErr: '',
    password: '',
    passErr: ''
  });

  const handleStateChanged = (prop: string, value: string | number | boolean) => {
    setState({ ...state, [prop]: value });
  };

  const navigate = useNavigate();

  return (
    <HomeContainer>
      <LoginContainer>
        <Avatar src={userAvatar} alt="user-avatar" />
        <InputField
          type="text"
          name="email"
          label="Email"
          placeholder="Email address"
          value={state.email}
          setValue={handleStateChanged}
          icon={<FaUser style={{ width: '100%', height: '100%' }} />}
          isError={state.emailErr !== ''}
          message={state.emailErr}
        />
        <InputField
          type="password"
          name="password"
          label="Password"
          value={state.password}
          setValue={handleStateChanged}
          placeholder="Password"
          icon={<FaLock style={{ width: '100%', height: '100%' }} />}
        />
        <Button color="#4096ff">Sign In</Button>
        <SignUp onClick={() => navigate('/signup')}>Don't have an account? Sign Up</SignUp>
      </LoginContainer>
    </HomeContainer>
  );
};

export const HomeContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
`;

export const LoginContainer = styled.div`
  width: 400px;
  height: 600px;
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 15px;
`;

export const Avatar = styled.img`
  width: 220px;
  height: auto;
`;

const SignUp = styled.div`
  cursor: pointer;
  font-size: 14px;
  color: ${(props) => props.theme.primary};
  :hover {
    text-decoration: underline;
  }
`;
