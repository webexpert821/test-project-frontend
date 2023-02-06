import { useEffect, useState, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useStore } from 'src/context/StoreContext';
import styled, { css } from 'styled-components';
import { IoMdArrowDropdown, IoMdArrowDropup } from 'react-icons/io';

export const LanguageSelect = () => {
  const { i18n } = useTranslation();
  const { lang, setLang } = useStore();
  const [isDeskOpen, deskSetOpen] = useState(false);
  const DsDropRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setLang(lang);
  }, [lang]);
  const LanguageChoose = (e: any) => {
    let language = e.target.innerHTML;
    switch (language) {
      case 'ENGLISH':
        setLang('ENG');
        language = 'English';
        break;
      case 'ESPAÑOL':
        setLang('ESP');
        language = 'Spanish';
        break;
      default:
        break;
    }
    i18n.changeLanguage(language);
    deskSetOpen(false);
  };

  return (
    <LanguageChooseContainer>
      <DesktopDropDownContainer data-aria-expanded={isDeskOpen} ref={DsDropRef}>
        <DropdownButton className="dbtn" onClick={() => deskSetOpen(!isDeskOpen)}>
          {lang}
          {!isDeskOpen ? (
            <IoMdArrowDropdown style={{ width: '25px', height: '25px' }} />
          ) : (
            <IoMdArrowDropup style={{ width: '25px', height: '25px' }} />
          )}
        </DropdownButton>
        <DropDownContent className="dcontent" style={{ transform: isDeskOpen ? 'scale(1)' : 'scale(0)' }}>
          <DropdownItem onClick={LanguageChoose}>ENGLISH</DropdownItem>
          <DropdownItem onClick={LanguageChoose}>ESPAÑOL</DropdownItem>
        </DropDownContent>
      </DesktopDropDownContainer>
    </LanguageChooseContainer>
  );
};

const LanguageChooseContainer = styled.div`
  position: absolute;
  right: 60px;
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

const DesktopDropDownContainer = styled.div`
  ${DropDownContainer};
  display: flex;
  @media screen and (max-width: 1096px) {
    display: none;
  }
`;

const DropdownButton = styled.div`
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

const DropDownContent = styled.div`
  display: flex;
  position: absolute;
  flex-direction: column;
  border-radius: 20px;
  background: #1d1d1d;
  letter-spacing: 0.875px;
  transition: all linear 0.2s;
  color: ${(props) => props.theme.white};

  text-transform: uppercase;
  top: 4rem;
  z-index: 100;

  @media screen and (max-width: 720px) {
    margin-left: -20px;
  }

  @media screen and (max-width: 420px) {
    margin-left: -20px;
  }

  @media screen and (max-width: 360px) {
    margin-left: -40px;
  }
`;

const DropdownItem = styled.div`
  padding: 15px 20px;

  cursor: pointer;
  color: ${(props) => props.theme.white};
  transition: all linear 0.6s;
  &:hover {
    /* filter: grayscale(0) !important; */
    color: ${(props) => props.theme.blackAlpha};
  }
`;
