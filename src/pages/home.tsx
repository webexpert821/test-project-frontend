/* eslint-disable no-console */
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { HomeContainer, LoginContainer } from './signIn';
import { LogoutButton } from 'src/components/button/LogoutButton';
import { LanguageSelect } from 'src/components/select';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';

export const Home = () => {
  const { t } = useTranslation();
  return (
    <HomeContainer>
      <LoginContainer>
        <LanguageSelect />
        <LogoutButton />
        <Label>{t('main.hello')}</Label>
      </LoginContainer>
    </HomeContainer>
  );
};

const Label = styled.div`
  font-size: 40px;
  font-weight: 800;
`;
