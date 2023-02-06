import { useNavigate } from 'react-router-dom';
import styled, { css } from 'styled-components';

export const LogoutButton = () => {
  const navigate = useNavigate();
  const logOut = () => {
    localStorage.removeItem('username');
    navigate('/signin');
  };
  return (
    <LogoutButtonContainer>
      <LogoutButtonWrapper>
        <LogoutButtonContent onClick={logOut}>Log out</LogoutButtonContent>
      </LogoutButtonWrapper>
    </LogoutButtonContainer>
  );
};

const LogoutButtonContainer = styled.div`
  position: absolute;
  right: 160px;
  top: 60px;
`;

const DropDownContainer = css`
  display: flex;
  flex-direction: column;
  gap: 10px;
  font-family: 'gotham-bold';
  margin: 0 auto;
  position: relative;
  /* transition: all linear 0.6s;
  transition: height 0.35s cubic-bezier(0.65, 0.05, 0.36, 1); */

  &[data-aria-expanded='true'] {
    .dcontent {
      opacity: 1;
    }
  }
  &[data-aria-expanded='false'] {
    .dcontent {
      opacity: 0;
    }
  }
`;

const LogoutButtonWrapper = styled.div`
  ${DropDownContainer};
  display: flex;
  @media screen and (max-width: 1096px) {
    display: none;
  }
`;

const LogoutButtonContent = styled.div`
  background: #1d1d1d;
  border-radius: 28px;
  letter-spacing: 0.875px;
  color: ${(props) => props.theme.white};
  text-transform: uppercase;
  border: none;
  padding: 0px 18px;
  height: 47px;
  font-size: 13px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;

  @media screen and (max-width: 640px) {
    background: none;
    padding: 10px;
  }
  @media screen and (max-width: 480px) {
    font-size: 10px;
  }
`;
