import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { MdVisibility, MdVisibilityOff } from 'react-icons/md';

interface InputProps {
  icon?: React.ReactNode;
  type?: string;
  name: string;
  label?: string;
  value: string;
  setValue: (e: string | React.ChangeEvent<HTMLInputElement>) => void;
  isDisabled?: boolean;
  isError?: boolean;
  placeholder?: string;
  message?: string;
}

export const InputField = (props: InputProps) => {
  const { icon, type, name, value, setValue, isDisabled, isError, placeholder, message } = props;
  const inputRef = useRef<HTMLDivElement>(null);
  const valueRef = useRef<HTMLInputElement>(null);
  const [isVisit, setVisit] = useState(false);
  const [isVisible, setVisible] = useState(false);

  useEffect(() => {
    document.addEventListener('mousedown', (event) => handleClickOutside(event as any));
  }, [inputRef]);

  const handleClickOutside = (event: React.MouseEvent<HTMLElement>) => {
    if (inputRef.current != null && !inputRef.current.contains(event.target as any)) {
      setVisit(false);
    }
  };

  const handleClickInside = () => {
    setVisit(true);
    valueRef.current?.focus();
  };

  return (
    <InputContainer>
      <InputFieldContainer
        ref={inputRef}
        onMouseUp={() => handleClickInside()}
        visited={isVisit ? 1 : 0}
        isError={isError}
      >
        <InputWraper>
          <InputIcon>{icon}</InputIcon>
          <InputValue
            name={name}
            type={isVisible ? 'text' : type}
            value={value}
            disabled={isDisabled}
            ref={valueRef}
            placeholder={placeholder !== undefined ? placeholder : ''}
            onChange={(e) => setValue(e)}
          />
          {type === 'password' && (
            <InputIcon onClick={() => setVisible(!isVisible)} style={{ cursor: 'pointer' }}>
              {isVisible ? (
                <MdVisibility style={{ width: '100%', height: '100%' }} />
              ) : (
                <MdVisibilityOff style={{ width: '100%', height: '100%' }} />
              )}
            </InputIcon>
          )}
        </InputWraper>
      </InputFieldContainer>
      <InputMessage>{message}</InputMessage>
    </InputContainer>
  );
};

interface InputFieldProps {
  visited: number;
  isError?: boolean;
}

const InputContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 6px;
  flex-direction: column;
  width: 100%;
  position: relative;
`;

const InputFieldContainer = styled.div<InputFieldProps>`
  width: 100%;
  height: 32px;
  border-radius: 8px;
  border: ${(props) =>
    props.isError ?? false
      ? `1px solid ${String(props.theme.danger)}`
      : props.visited === 1
      ? `1px solid ${String(props.theme.primary)}`
      : `1px solid ${String(props.theme.secondary)}`};
  display: flex;
  align-items: center;
  :hover {
    border: ${(props) => `1px solid ${String(props.theme.primary)}`};
  }
`;

const InputWraper = styled.div`
  width: 100%;
  padding: 4px 11px;
  display: flex;
  align-items: center;
  gap: 8px;
`;

const InputValue = styled.input`
  outline: none;
  border: none;
  width: 100%;
  background: none;
  transition: all 0.2s;
  font-size: 14px;
  color: ${(props) => props.theme.black};
`;

const InputIcon = styled.div`
  width: 16px;
  height: auto;
  display: flex;
  justify-content: center;
  align-items: center;
  opacity: 0.5;
`;

const InputMessage = styled.div`
  width: 100%;
  padding-left: 10px;
  height: 10px;
  font-size: 12px;
  color: ${(props) => props.theme.danger};
`;
