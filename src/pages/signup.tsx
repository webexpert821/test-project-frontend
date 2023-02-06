/* eslint-disable no-console */
import { useEffect } from 'react';
import { FaUser, FaAddressCard, FaCity, FaPhoneAlt, FaLock } from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';
import { ImEarth } from 'react-icons/im';
import { InputField } from 'src/components/input';
import { userAvatar } from 'src/config/images';
import styled from 'styled-components';
import { Avatar, HomeContainer, LoginContainer } from './signIn';
import { Button } from 'src/components/button';
import { useNavigate } from 'react-router-dom';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { signUpAction } from 'src/actions/auth';

import { connect } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { LanguageSelect } from 'src/components/select';
interface StateProps {
  firstName: string;
  lastName: string;
  email: string;
  address1: string;
  address2: string;
  city: string;
  state: string;
  phone: string;
  password: string;
  confirmPass: string;
}

interface SignUpProps {
  signUpAction: (values: StateProps) => void;
  auth: { auth: object };
}

const SignUp = (props: SignUpProps) => {
  const { signUpAction } = props;

  const state: StateProps = {
    firstName: '',
    lastName: '',
    email: '',
    address1: '',
    address2: '',
    city: '',
    state: '',
    phone: '',
    password: '',
    confirmPass: ''
  };

  const navigate = useNavigate();
  const { t } = useTranslation();

  const pattern = /^\(\d{3}\)\s\d{3}-\d{4}$/;

  const username = localStorage.getItem('username');
  console.log({ username });
  useEffect(() => {
    if (username) {
      const decoded: any = localStorage.token;
      console.log(decoded);
      navigate('/');
    } else {
      navigate('/signup');
    }
  }, [username]);

  const validationSchema = Yup.object().shape({
    firstName: Yup.string().required('First name is required'),
    lastName: Yup.string().required(`Last name is required`),
    email: Yup.string().email(`Email is not valid`).required(`Email is required`),
    address1: Yup.string().required(`Address 1 is required`),
    address2: Yup.string().required(`Address2 is required`),
    city: Yup.string().required(`City is required`),
    state: Yup.string().required(`State is required`),
    phone: Yup.string().matches(pattern, 'Phone number is not valid').required(`Phone number is required`),
    password: Yup.string()
      .required(`Password is required`)
      .min(8, `Password is too short - should be 8 characters minimum`),
    confirmPass: Yup.string()
      .required(`Confirm password is required`)
      .oneOf([Yup.ref('password'), null], `Password is required`)
      .min(8, `Password is too short - should be 8 characters minimum`)
  });

  const submitForm = async (values: StateProps) => {
    signUpAction(values);
  };

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
              <InputGroup>
                <InputField
                  type="text"
                  name="firstName"
                  label="FirstName"
                  placeholder={String(t('signup.firstname'))}
                  value={values.firstName}
                  setValue={handleChange}
                  icon={<FaUser style={inputStyle} />}
                  isError={errors.firstName !== null && touched.firstName}
                  message={errors.firstName}
                />
                <InputField
                  type="text"
                  name="lastName"
                  label="LastName"
                  placeholder={String(t('signup.lastname'))}
                  value={values.lastName}
                  setValue={handleChange}
                  icon={<FaUser style={inputStyle} />}
                  isError={errors.lastName !== '' && touched.lastName}
                  message={errors.lastName}
                />
              </InputGroup>
              <InputField
                type="text"
                name="email"
                label="email"
                placeholder={String(t('signup.email'))}
                value={values.email}
                setValue={handleChange}
                icon={<MdEmail style={inputStyle} />}
                isError={errors.email !== '' && touched.email}
                message={errors.email}
              />
              <InputGroup>
                <InputField
                  type="text"
                  name="address1"
                  label="address1"
                  placeholder={String(t('signup.address1'))}
                  value={values.address1}
                  setValue={handleChange}
                  icon={<FaAddressCard style={inputStyle} />}
                  isError={errors.address1 !== '' && touched.address1}
                  message={errors.address1}
                />
                <InputField
                  type="text"
                  name="address2"
                  label="address2"
                  placeholder={String(t('signup.address2'))}
                  value={values.address2}
                  setValue={handleChange}
                  icon={<FaAddressCard style={inputStyle} />}
                  isError={errors.address2 !== '' && touched.address2}
                  message={errors.address2}
                />
              </InputGroup>

              <InputGroup>
                <InputField
                  type="text"
                  name="city"
                  label="city"
                  placeholder={String(t('signup.city'))}
                  value={values.city}
                  setValue={handleChange}
                  icon={<FaCity style={inputStyle} />}
                  isError={errors.city !== '' && touched.city}
                  message={errors.city}
                />
                <InputField
                  type="text"
                  name="state"
                  label="state"
                  placeholder={String(t('signup.state'))}
                  value={values.state}
                  setValue={handleChange}
                  icon={<ImEarth style={inputStyle} />}
                  isError={errors.state !== '' && touched.state}
                  message={errors.state}
                />
              </InputGroup>
              <InputField
                type="text"
                name="phone"
                label="phone"
                placeholder={String(t('signup.phonenumber'))}
                value={values.phone}
                setValue={handleChange}
                icon={<FaPhoneAlt style={inputStyle} />}
                isError={errors.phone !== '' && touched.phone}
                message={errors.phone}
              />
              <InputGroup>
                <InputField
                  type="password"
                  name="password"
                  label="password"
                  placeholder={String(t('signup.password'))}
                  value={values.password}
                  setValue={handleChange}
                  icon={<FaLock style={inputStyle} />}
                  isError={errors.password !== '' && touched.password}
                  message={errors.password}
                />
                <InputField
                  type="password"
                  name="confirmPass"
                  label="Confirm Password"
                  placeholder={String(t('signup.confirmpassword'))}
                  value={values.confirmPass}
                  setValue={handleChange}
                  icon={<FaLock style={inputStyle} />}
                  isError={errors.confirmPass !== '' && touched.confirmPass}
                  message={errors.confirmPass}
                />
              </InputGroup>
              <Action>
                <Button type="submit" color="#4096ff" onClick={handleSubmit}>
                  {t('signin.signup')}
                </Button>
                <Label>
                  {t('signup.alreadyhave')}
                  <SignInLink onClick={() => navigate('/signin')}>{t('signin.signin')}</SignInLink>
                </Label>
              </Action>
            </LoginContainer>
          </HomeContainer>
        );
      }}
    </Formik>
  );
};

const InputGroup = styled.div`
  width: 100%;
  display: flex;
  gap: 15px;
  align-items: center;
`;

const Label = styled.div`
  font-size: 14px;
  display: flex;
  align-items: center;
  gap: 10px;
  color: ${(props) => props.theme.primary};
`;

const SignInLink = styled.div`
  cursor: pointer;
  text-decoration: underline;
  color: ${(props) => props.theme.primary};
`;

const Action = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 15px;
  padding: 20px;
`;

const mapStateToProps = (state: any) => ({
  auth: state.auth.auth
});

export default connect(mapStateToProps, { signUpAction })(SignUp);
