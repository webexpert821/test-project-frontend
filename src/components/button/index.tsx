import styled from 'styled-components';

interface Buttonprops {
  color: string;
  children: React.ReactNode;
  onClick?: () => void;
}

export const Button = (props: Buttonprops) => {
  const { color, onClick, children } = props;
  return (
    <ButtonContainer color={color} onClick={onClick}>
      {children}
    </ButtonContainer>
  );
};

const ButtonContainer = styled.div`
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
  :hover {
    opacity: 0.8;
  }
`;
