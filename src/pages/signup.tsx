import { useState } from 'react';
import { FaUser, FaAddressCard, FaCity, FaPhoneAlt, FaLock } from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';
import { ImEarth } from 'react-icons/im';
import { InputField } from 'src/components/input';
import { Select } from 'src/components/select';
import { userAvatar } from 'src/config/images';
import styled from 'styled-components';
import { Avatar, HomeContainer, LoginContainer } from './signIn';
import { Button } from 'src/components/button';
import { useNavigate } from 'react-router-dom';

export const SignUp = () => {
  const [state, setState] = useState({
    firstName: '',
    firstNameErr: '',
    lastName: '',
    lastNameErr: '',
    email: '',
    emailErr: '',
    address1: '',
    address1Err: '',
    address2: '',
    address2Err: '',
    city: '',
    cityErr: '',
    state: '',
    stateErr: '',
    phone: '',
    phoneErr: '',
    password: '',
    passwordErr: '',
    confirmPass: '',
    confirmPassErr: ''
  });

  const handleStateChanged = (prop: string, value: string | number | boolean) => {
    setState({ ...state, [prop]: value });
  };

  const navigate = useNavigate();

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
            value={state.firstName}
            setValue={handleStateChanged}
            icon={<FaUser style={{ width: '100%', height: '100%' }} />}
            isError={state.firstNameErr !== ''}
            message={state.firstNameErr}
          />
          <InputField
            type="text"
            name="lastName"
            label="LastName"
            placeholder="Last Name"
            value={state.lastName}
            setValue={handleStateChanged}
            icon={<FaUser style={{ width: '100%', height: '100%' }} />}
            isError={state.lastNameErr !== ''}
            message={state.lastNameErr}
          />
        </InputGroup>
        <InputField
          type="text"
          name="email"
          label="email"
          placeholder="Email"
          value={state.email}
          setValue={handleStateChanged}
          icon={<MdEmail style={{ width: '100%', height: '100%' }} />}
          isError={state.emailErr !== ''}
          message={state.emailErr}
        />
        <InputGroup>
          <InputField
            type="text"
            name="address1"
            label="address1"
            placeholder="Address Line1"
            value={state.address1}
            setValue={handleStateChanged}
            icon={<FaAddressCard style={{ width: '100%', height: '100%' }} />}
            isError={state.address1Err !== ''}
            message={state.address1Err}
          />
          <Select
            name="address2"
            label="address2"
            placeholder="Address Line2"
            value={state.address2}
            setValue={handleStateChanged}
            icon={<FaAddressCard style={{ width: '100%', height: '100%' }} />}
            isError={state.address2Err !== ''}
            message={state.address2Err}
            option={[
              { value: 'Address 1' },
              { value: 'Address 2' },
              { value: 'Address 3' },
              { value: 'Address 4' },
              { value: 'Address 5' }
            ]}
          />
        </InputGroup>
        <InputGroup>
          <InputField
            type="text"
            name="city"
            label="city"
            placeholder="City"
            value={state.city}
            setValue={handleStateChanged}
            icon={<FaCity style={{ width: '100%', height: '100%' }} />}
            isError={state.cityErr !== ''}
            message={state.cityErr}
          />
          <InputField
            type="text"
            name="state"
            label="state"
            placeholder="State"
            value={state.state}
            setValue={handleStateChanged}
            icon={<ImEarth style={{ width: '100%', height: '100%' }} />}
            isError={state.stateErr !== ''}
            message={state.stateErr}
          />
        </InputGroup>
        <InputField
          type="text"
          name="phone"
          label="phone"
          placeholder="Phone Number"
          value={state.phone}
          setValue={handleStateChanged}
          icon={<FaPhoneAlt style={{ width: '100%', height: '100%' }} />}
          isError={state.phoneErr !== ''}
          message={state.phoneErr}
        />
        <InputGroup>
          <InputField
            type="password"
            name="password"
            label="password"
            placeholder="Password"
            value={state.password}
            setValue={handleStateChanged}
            icon={<FaLock style={{ width: '100%', height: '100%' }} />}
            isError={state.passwordErr !== ''}
            message={state.passwordErr}
          />
          <InputField
            type="password"
            name="confirmPass"
            label="Confirm Password"
            placeholder="Confirm Password"
            value={state.confirmPass}
            setValue={handleStateChanged}
            icon={<FaLock style={{ width: '100%', height: '100%' }} />}
            isError={state.confirmPassErr !== ''}
            message={state.confirmPassErr}
          />
        </InputGroup>
        <Button color="#4096ff">Sign Up</Button>
        <Label>
          Already have an account ? <SignInLink onClick={() => navigate('/signin')}>Sign In</SignInLink>
        </Label>
      </LoginContainer>
    </HomeContainer>
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
