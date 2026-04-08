import React, { useCallback, useEffect, useRef, useState } from 'react';

import { FaPalette } from 'react-icons/fa';
import styled from 'styled-components';

import { useThemeSwitch } from '../styles/ThemeContext';
import { themes, themeList } from '../styles/themes';
import { size } from '../styles/variables';

const SwitcherWrapper = styled.div`
  position: relative;
  margin-left: auto;
`;

const TriggerButton = styled.button<{ $open: boolean }>`
  display: flex;
  align-items: center;
  gap: 0.8rem;
  height: 3.2rem;
  padding: 0 1.2rem;
  background-color: ${({ theme, $open }) =>
    $open ? theme.background.cardHover : theme.background.card};
  color: ${({ theme }) => theme.text.primary};
  border: none;
  border-radius: ${({ theme }) => theme.border.radius};
  cursor: pointer;
  font-family: ${({ theme }) => theme.meta.fontFamily};
  font-size: 1.4rem;
  transition: background-color 200ms ease-in-out;

  &:hover {
    background-color: ${({ theme }) => theme.background.cardHover};
  }

  &:focus-visible {
    outline: 0.2rem solid ${({ theme }) => theme.border.focus};
    outline-offset: 0.2rem;
  }

  @media (prefers-reduced-motion: reduce) {
    transition: none;
  }
`;

const ThemeName = styled.span`
  display: none;

  @media (min-width: ${size.desktop}) {
    display: inline;
  }
`;

const Dropdown = styled.div<{ $open: boolean }>`
  position: absolute;
  top: 100%;
  right: 0;
  width: 22rem;
  margin-top: 0.8rem;
  background-color: ${({ theme }) => theme.background.card};
  border: 0.1rem solid ${({ theme }) => theme.border.default};
  border-radius: ${({ theme }) => theme.border.radius};
  box-shadow: ${({ theme }) => theme.meta.cardBoxShadow};
  display: ${({ $open }) => ($open ? 'block' : 'none')};
  z-index: 100;
`;

const ThemeList = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0.4rem 0;
`;

const ThemeOption = styled.li<{ $active: boolean }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 4rem;
  padding: 0 1.2rem;
  cursor: pointer;
  background-color: ${({ $active, theme }) =>
    $active ? theme.background.cardHover : 'transparent'};
  transition: background-color 150ms ease-in-out;

  &:hover {
    background-color: ${({ theme }) => theme.background.cardHover};
  }

  &:focus-visible {
    outline: 0.2rem solid ${({ theme }) => theme.border.focus};
    outline-offset: -0.2rem;
  }

  @media (prefers-reduced-motion: reduce) {
    transition: none;
  }
`;

const OptionContent = styled.div`
  display: flex;
  align-items: center;
  gap: 1.2rem;
`;

const OptionName = styled.span`
  font-size: 1.4rem;
  color: ${({ theme }) => theme.text.primary};
`;

const SwatchContainer = styled.div`
  display: flex;
  gap: 0.4rem;
`;

const Swatch = styled.div<{ $color: string }>`
  width: 1.2rem;
  height: 1.2rem;
  border-radius: 50%;
  background-color: ${({ $color }) => $color};
  border: 0.1rem solid rgba(255, 255, 255, 0.2);
`;

const Checkmark = styled.span<{ $visible: boolean }>`
  display: ${({ $visible }) => ($visible ? 'block' : 'none')};
  color: ${({ theme }) => theme.accent.primary};
  font-size: 1.6rem;
`;

export const ThemeSwitcher = () => {
  const { themeName, setTheme } = useThemeSwitch();
  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const optionRefs = useRef<(HTMLLIElement | null)[]>([]);

  const currentTheme = themes[themeName];
  const currentThemeDisplayName = currentTheme?.name ?? themeName;

  const handleToggle = useCallback(() => {
    setIsOpen((prev) => {
      if (prev) {
        setActiveIndex(-1);
      }
      return !prev;
    });
  }, []);

  const handleClose = useCallback(() => {
    setIsOpen(false);
    setActiveIndex(-1);
  }, []);

  const handleSelect = useCallback(
    (slug: string) => {
      setTheme(slug);
      handleClose();
      triggerRef.current?.focus();
    },
    [setTheme, handleClose],
  );

  // Click outside to close
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        triggerRef.current &&
        !triggerRef.current.contains(event.target as Node)
      ) {
        handleClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, handleClose]);

  // Escape to close
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isOpen) {
        handleClose();
        triggerRef.current?.focus();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, handleClose]);

  // Focus management when opening
  useEffect(() => {
    if (isOpen && activeIndex >= 0 && optionRefs.current[activeIndex]) {
      optionRefs.current[activeIndex]?.focus();
    }
  }, [isOpen, activeIndex]);

  const handleTriggerKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLButtonElement>) => {
      if (event.key === 'ArrowDown') {
        event.preventDefault();
        setIsOpen(true);
        setActiveIndex(0);
      } else if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        handleToggle();
      }
    },
    [handleToggle],
  );

  const handleOptionKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLLIElement>, slug: string, index: number) => {
      if (event.key === 'ArrowDown') {
        event.preventDefault();
        const nextIndex = (index + 1) % themeList.length;
        setActiveIndex(nextIndex);
        optionRefs.current[nextIndex]?.focus();
      } else if (event.key === 'ArrowUp') {
        event.preventDefault();
        const prevIndex = index === 0 ? themeList.length - 1 : index - 1;
        setActiveIndex(prevIndex);
        optionRefs.current[prevIndex]?.focus();
      } else if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        handleSelect(slug);
      } else if (event.key === 'Home') {
        event.preventDefault();
        setActiveIndex(0);
        optionRefs.current[0]?.focus();
      } else if (event.key === 'End') {
        event.preventDefault();
        setActiveIndex(themeList.length - 1);
        optionRefs.current[themeList.length - 1]?.focus();
      } else if (event.key === 'Tab' && !event.shiftKey && index === themeList.length - 1) {
        // Tab from last item closes dropdown
        handleClose();
      } else if (event.key === 'Tab' && event.shiftKey && index === 0) {
        // Shift+Tab from first item closes dropdown
        handleClose();
      }
    },
    [handleSelect, handleClose],
  );

  return (
    <SwitcherWrapper>
      <TriggerButton
        ref={triggerRef}
        $open={isOpen}
        onClick={handleToggle}
        onKeyDown={handleTriggerKeyDown}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-label="Select site theme"
        type="button"
      >
        <FaPalette aria-hidden="true" />
        <ThemeName>{currentThemeDisplayName}</ThemeName>
      </TriggerButton>

      <Dropdown ref={dropdownRef} $open={isOpen}>
        <ThemeList role="listbox" aria-label="Themes">
          {themeList.map((theme, index) => {
            const themeData = themes[theme.slug];
            const isSelected = themeName === theme.slug;

            return (
              <ThemeOption
                key={theme.slug}
                ref={(el) => {
                  optionRefs.current[index] = el;
                }}
                $active={index === activeIndex}
                role="option"
                aria-selected={isSelected}
                tabIndex={index === activeIndex ? 0 : -1}
                onClick={() => handleSelect(theme.slug)}
                onKeyDown={(e) => handleOptionKeyDown(e, theme.slug, index)}
              >
                <OptionContent>
                  <SwatchContainer>
                    <Swatch $color={themeData?.background.page ?? '#000'} />
                    <Swatch $color={themeData?.accent.primary ?? '#000'} />
                    <Swatch $color={themeData?.accent.secondary ?? '#000'} />
                  </SwatchContainer>
                  <OptionName>{theme.name}</OptionName>
                </OptionContent>
                <Checkmark $visible={isSelected}>✓</Checkmark>
              </ThemeOption>
            );
          })}
        </ThemeList>
      </Dropdown>
    </SwitcherWrapper>
  );
};
