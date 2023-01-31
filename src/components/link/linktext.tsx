import React from 'react';
import styled from 'styled-components';
import { Text } from '../text/text';

interface LinkTextProps {
  children: React.ReactNode;
  className?: string;
  link?: string;
}

export const LinkText = ({ children, className, link }: LinkTextProps) => {
  return (
    <>
      <TextWrapper className={className} href={link} target="_blank">
        <Text>{children}</Text>
      </TextWrapper>
    </>
  );
};

const TextWrapper = styled.a`
  cursor: pointer;
  color: ${(props) => props.theme.lightGrey};
  text-decoration: none;
`;
