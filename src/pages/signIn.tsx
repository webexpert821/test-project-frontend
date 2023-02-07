/* eslint-disable no-console */
import { InputField } from 'src/components/input';
import styled from 'styled-components';
import { FaUser, FaLock } from 'react-icons/fa';
import { Button } from 'src/components/button';
import { userAvatar, GoogleIcon, TwitterIcon, FacebookIcon, LinkedinIcon } from 'src/config/images';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { useEffect } from 'react';
import { Formik } from 'formik';
import axios from 'axios';
import { PRIVATE_ROUTES } from 'src/config/routes';
import { toast } from 'react-toastify';
import jwtDecode from 'jwt-decode';
import { useTranslation } from 'react-i18next';
import { LanguageSelect } from 'src/components/select';

export const SignIn = () => {
  interface StateProps {
    email: string;
    password: string;
  }
  const state: StateProps = {
    email: '',
    password: ''
  };
  const { t } = useTranslation();

  const username = localStorage.getItem('username');
  console.log({ username });
  useEffect(() => {
    if (username) {
      const decoded: any = localStorage.token;
      console.log(decoded);
      navigate('/');
    } else {
      navigate('/signin');
    }
  }, [username]);

  const validationSchema = Yup.object().shape({
    email: Yup.string().email(`Email is not valid`).required(`Email is required`),
    password: Yup.string()
      .required(`Password is required`)
      .min(8, `Password is too short - should be 8 characters minimum`)
  });

  const submitForm = async (values: StateProps) => {
    // eslint-disable-next-line no-console
    console.log({ values });
    await axios
      .post(`${PRIVATE_ROUTES.backendURL}/api/users/signin`, values)
      .then((res) => {
        console.log({ res });
        const userInfo = res.data;
        const username = Object(userInfo).firstName;
        console.log({ username });
        localStorage.setItem('username', username);
        navigate('/');
      })
      .catch((err) => {
        console.log({ err });
        // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
        toast.error(`${err.response.data}`);
      });
  };

  const navigate = useNavigate();

  const inputStyle = { width: '100%', height: '100%' };

  return (
    <Formik initialValues={state} validationSchema={validationSchema} onSubmit={async (e) => await submitForm(e)}>
      {(formik) => {
        // eslint-disable-next-line @typescript-eslint/naming-convention
        const { values, handleChange, handleSubmit, errors, touched } = formik;
        return (
          <HomeContainer>
            <LoginContainer>
              <LanguageSelect />
              <Avatar src={userAvatar} alt="user-avatar" />
              <InputField
                type="text"
                name="email"
                label="Email"
                placeholder={'Email'}
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
                {t('signin.signin')}
              </Button>
              <Label>{t('signin.orconnectwith')}</Label>
              <SocialLogin>
                <SocialIcon src={GoogleIcon} alt="google-icon" />
                <SocialIcon src={TwitterIcon} alt="twitter-icon" />
                <SocialIcon src={FacebookIcon} alt="facebook-icon" />
                <SocialIcon src={LinkedinIcon} alt="linkedin-icon" />
              </SocialLogin>
              <SignUp onClick={() => navigate('/signup')}>
                {t('signin.donthave')} {t('signin.signup')}
              </SignUp>
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
  width: 100%;
  height: 100%;
`;

export const LoginContainer = styled.div`
  width: 400px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 15px;
  padding-left: 20px;
  padding-right: 20px;
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
