import styled from 'styled-components';

interface Buttonprops {
  type?: 'button' | 'submit' | 'reset' | undefined;
  color: string;
  children: React.ReactNode;
  onClick?: () => void;
}

export const Button = (props: Buttonprops) => {
  const { type, color, onClick, children } = props;
  return (
    <ButtonContainer type={type} color={color} onClick={onClick}>
      {children}
    </ButtonContainer>
  );
};

const ButtonContainer = styled.button`
  width: 100%;
  height: 36px;
  background-color: ${(props) => props.color};
  color: #ffffff;
  font-size: 15px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  border-radius: 8px;
  transition: all 0.2s;
  border: none;
  :hover {
    opacity: 0.8;
  }
`;
