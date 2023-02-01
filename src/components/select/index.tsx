import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { MdOutlineKeyboardArrowDown, MdOutlineKeyboardArrowUp, MdVisibility, MdVisibilityOff } from 'react-icons/md';

interface InputProps {
  icon: React.ReactNode;
  name: string;
  label?: string;
  value: string;
  setValue: (prop: string, value: string | number | boolean) => void;
  isDisabled?: boolean;
  isError?: boolean;
  placeholder?: string;
  message?: string;
  option: Array<{ value: string }>;
}

export const Select = (props: InputProps) => {
  const { icon, name, label, value, setValue, isDisabled, isError, placeholder, message, option } = props;
  const inputRef = useRef<HTMLDivElement>(null);
  const valueRef = useRef<HTMLInputElement>(null);
  const [isVisit, setVisit] = useState(false);
  const [isOpen, setOpen] = useState(false);

  useEffect(() => {
    document.addEventListener('mousedown', (event) => handleClickOutside(event as any));
  }, [inputRef]);

  const handleClickOutside = (event: React.MouseEvent<HTMLElement>) => {
    if (inputRef.current != null && !inputRef.current.contains(event.target as any)) {
      setVisit(false);
      setOpen(false);
    }
  };

  const handleClickInside = () => {
    setVisit(true);
    valueRef.current?.focus();
  };

  const handleClick = (val: string) => {
    setValue(name, val);
    setOpen(false);
  };

  return (
    <InputContainer>
      <InputFieldContainer
        ref={inputRef}
        onMouseUp={() => handleClickInside()}
        visited={isVisit ? 1 : 0}
        isError={isError}
        data-aria-expanded={isOpen}
      >
        <InputWraper onClick={() => setOpen(true)}>
          <InputIcon>{icon}</InputIcon>
          <InputValue ref={valueRef} onClick={() => setOpen(true)}>
            {value === '' ? placeholder : value}
          </InputValue>
          <InputIcon>
            {isOpen ? (
              <MdOutlineKeyboardArrowUp style={{ width: '100%', height: '100%' }} />
            ) : (
              <MdOutlineKeyboardArrowDown style={{ width: '100%', height: '100%' }} />
            )}
          </InputIcon>
        </InputWraper>
        <SelectContent className="selectContent" style={{ height: isOpen ? 'fit-content' : '0px' }}>
          {option.map((item, index) => (
            <SelectItem onClick={(e) => handleClick(e.currentTarget.innerText)} hidden={isOpen} key={index}>
              {item.value}
            </SelectItem>
          ))}
        </SelectContent>
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
  &[data-aria-expanded='true'] {
    .selectContent {
      opacity: 1;
    }
  }
  &[data-aria-expanded='false'] {
    .selectContent {
      opacity: 0;
    }
  }
`;

const InputWraper = styled.div`
  width: 100%;
  padding: 4px 11px;
  display: flex;
  align-items: center;
  gap: 8px;
`;

const InputValue = styled.div`
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

const SelectContent = styled.div`
  display: flex;
  position: absolute;
  width: 100%;
  flex-direction: column;
  border-radius: 8px;
  background: ${(props) => props.theme.white};
  letter-spacing: 0.875px;
  transition: all linear 0.2s;
  color: ${(props) => props.theme.black};
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;

  top: 2.5rem;
  z-index: 100;
`;

const SelectItem = styled.div`
  padding: 10px;
  border-radius: 8px;
  font-size: 14px;
  cursor: pointer;
  color: ${(props) => props.theme.black};
  :hover {
    background-color: ${(props) => props.theme.secondary};
  }
  display: ${(props) => (props.hidden ?? false ? 'block' : 'none')};
`;
