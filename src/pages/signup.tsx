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

export const SignUp = () => {
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
  const state = {
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

  const validationSchema = Yup.object().shape({
    firstName: Yup.string().required('First Name is required'),
    lastName: Yup.string().required('Last Name is required'),
    email: Yup.string().email('Invalid Email').required('Emaili is reuqired'),
    address1: Yup.string().required('Address1 is required'),
    address2: Yup.string().required('Address2 is required'),
    city: Yup.string().required('City is required'),
    state: Yup.string().required('State is required'),
    phone: Yup.string().required('State is required'),
    password: Yup.string()
      .required('Password is required')
      .min(8, 'Password is too short - should be 8 characters minimum'),
    confirmPass: Yup.string()
      .required('Confirm Password is required')
      .oneOf([Yup.ref('password'), null], 'Password must be match')
      .min(8, 'Password is too short - should be 8 characters minimum')
  });

  const submitForm = (values: StateProps) => {
    // eslint-disable-next-line no-console
    console.log({ values });
  };

  const inputStyle = { width: '100%', height: '100%' };

  return (
    <Formik initialValues={state} validationSchema={validationSchema} onSubmit={(e) => submitForm(e)}>
      {(formik) => {
        // eslint-disable-next-line @typescript-eslint/naming-convention
        const { values, handleChange, handleSubmit, errors, touched } = formik;
        return (
          <HomeContainer>
            <LoginContainer>
              <Avatar src={userAvatar} alt="user-avatar" />
              <InputGroup>
                <InputField
                  type="text"
                  name="firstName"
                  label="FirstName"
                  placeholder="First Name"
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
                  placeholder="Last Name"
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
                placeholder="Email"
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
                  placeholder="Address Line1"
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
                  placeholder="Address Line2"
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
                  placeholder="City"
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
                  placeholder="State"
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
                placeholder="Phone Number"
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
                  placeholder="Password"
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
                  placeholder="Confirm Password"
                  value={values.confirmPass}
                  setValue={handleChange}
                  icon={<FaLock style={inputStyle} />}
                  isError={errors.confirmPass !== '' && touched.confirmPass}
                  message={errors.confirmPass}
                />
              </InputGroup>
              <Button type="submit" color="#4096ff" onClick={handleSubmit}>
                Sign Up
              </Button>
              <Label>
                Already have an account ? <SignInLink onClick={() => navigate('/signin')}>Sign In</SignInLink>
              </Label>
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
