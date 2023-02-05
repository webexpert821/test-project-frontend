import { useState } from 'react';
import { InputField } from 'src/components/input';
import styled from 'styled-components';
import { FaUser, FaLock } from 'react-icons/fa';
import { Button } from 'src/components/button';
import { userAvatar, GoogleIcon, TwitterIcon, FacebookIcon, LinkedinIcon } from 'src/config/images';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { Formik } from 'formik';

export const SignIn = () => {
  interface StateProps {
    email: string;
    password: string;
  }
  const state = {
    email: '',
    password: ''
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string().email('Invalid Email').required('Emaili is reuqired'),
    password: Yup.string()
      .required('Password is required')
      .min(8, 'Password is too short - should be 8 characters minimum')
  });

  const submitForm = (values: StateProps) => {
    // eslint-disable-next-line no-console
    console.log({ values });
  };

  const navigate = useNavigate();

  const inputStyle = { width: '100%', height: '100%' };

  return (
    <Formik initialValues={state} validationSchema={validationSchema} onSubmit={(e) => submitForm(e)}>
      {(formik) => {
        // eslint-disable-next-line @typescript-eslint/naming-convention
        const { values, handleChange, handleSubmit, errors, touched, isValid, dirty } = formik;
        return (
          <HomeContainer>
            <LoginContainer>
              <Avatar src={userAvatar} alt="user-avatar" />
              <InputField
                type="text"
                name="email"
                label="Email"
                placeholder="Email address"
                value={values.email}
                setValue={handleChange}
                icon={<FaUser style={inputStyle} />}
                isError={errors.email !== null && touched.email}
                message={errors.email}
              />
              <InputField
                type="password"
                name="password"
                label="Password"
                value={values.password}
                setValue={handleChange}
                placeholder="Password"
                icon={<FaLock style={inputStyle} />}
                isError={errors.password !== null && touched.password}
                message={errors.password}
              />
              <Button type={'submit'} color="#4096ff" onClick={handleSubmit}>
                Sign In
              </Button>
              <Label>Or connect with</Label>
              <SocialLogin>
                <SocialIcon src={GoogleIcon} alt="google-icon" />
                <SocialIcon src={TwitterIcon} alt="twitter-icon" />
                <SocialIcon src={FacebookIcon} alt="facebook-icon" />
                <SocialIcon src={LinkedinIcon} alt="linkedin-icon" />
              </SocialLogin>
              <SignUp onClick={() => navigate('/signup')}>Don't have an account? Sign Up</SignUp>
            </LoginContainer>
          </HomeContainer>
        );
      }}
    </Formik>
  );
};

export const HomeContainer = styled.div`
  display: flex;
  justify-content: center;
  padding-top: 2rem;
  width: 100%;
  height: 100%;
`;

export const LoginContainer = styled.div`
  width: 400px;
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 15px;
`;

export const Avatar = styled.img`
  width: 220px;
  height: auto;
`;

const Label = styled.div`
  font-size: 14px;
  color: ${(props) => props.theme.primary};
  padding-top: 20px;
`;

const SignUp = styled.div`
  cursor: pointer;
  font-size: 14px;
  color: ${(props) => props.theme.primary};
  padding-top: 30px;
  :hover {
    text-decoration: underline;
  }
`;

const SocialLogin = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
`;

const SocialIcon = styled.img`
  width: 36px;
  height: 36px;
  cursor: pointer;
`;
