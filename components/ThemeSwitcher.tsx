import React, { useCallback, useEffect, useRef, useState } from 'react';

import { FaPalette } from 'react-icons/fa';
import styled from 'styled-components';

import { useThemeSwitch } from '../styles/ThemeContext';
import { themes, themeList } from '../styles/themes';
import { size } from '../styles/variables';

const themeAnimations: Record<string, string> = {
  'solarized-dark': `
    @keyframes sd-pulse {
      0%, 100% { border-left-color: transparent; }
      50% { border-left-color: #b58900; }
    }
    animation: sd-pulse 3s ease-in-out infinite;
  `,
  cyberpunk: `
    @keyframes cp-glitch {
      0%, 92%, 100% { transform: none; text-shadow: none; }
      93% { transform: translateX(-0.2rem); text-shadow: 0.2rem 0 #ff003c, -0.2rem 0 #00fff5; }
      95% { transform: translateX(0.2rem); text-shadow: -0.2rem 0 #ff003c, 0.2rem 0 #00fff5; }
      97% { transform: translateX(0); text-shadow: none; }
    }
    animation: cp-glitch 4s linear infinite;
  `,
  synthwave: `
    @keyframes sw-glow {
      0%, 100% { text-shadow: 0 0 0.4rem rgba(255, 106, 193, 0.3); }
      50% { text-shadow: 0 0 1rem rgba(255, 106, 193, 0.8), 0 0 2rem rgba(255, 106, 193, 0.4); }
    }
    animation: sw-glow 3s ease-in-out infinite;
  `,
  // bauhaus: no animation — stillness and geometric precision
  futurism: `
    @keyframes fu-skew {
      0%, 100% { transform: skewX(0deg); }
      50% { transform: skewX(-2deg); }
    }
    animation: fu-skew 2s ease-in-out infinite;
  `,
  geocities: `
    @keyframes gc-rainbow {
      0% { color: #ff0000; }
      16% { color: #ff8800; }
      33% { color: #ffff00; }
      50% { color: #00ff00; }
      66% { color: #0000ff; }
      83% { color: #ff00ff; }
      100% { color: #ff0000; }
    }
    animation: gc-rainbow 3s linear infinite;
  `,
  'windows-98': `
    @keyframes w98-load {
      0%, 100% { opacity: 1; }
      50% { opacity: 0.7; }
    }
    animation: w98-load 2s ease-in-out infinite;
  `,
};

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
  overflow: hidden;
  z-index: 100;
`;

const ThemeList = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
`;

const ThemeOption = styled.li<{
  $active: boolean;
  $pageBg: string;
  $textColor: string;
  $fontFamily: string;
  $accentPrimary: string;
  $borderRadius: string;
  $cardBorderStyle: string;
  $hoverBg: string;
  $focusBorder: string;
  $animationCss?: string;
}>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 1.2rem;
  cursor: pointer;
  background-color: ${({ $pageBg }) => $pageBg};
  color: ${({ $textColor }) => $textColor};
  font-family: ${({ $fontFamily }) => $fontFamily};
  border-left: 0.3rem solid
    ${({ $active, $accentPrimary }) => ($active ? $accentPrimary : 'transparent')};
  transition: all 150ms ease-in-out;

  &:hover {
    background-color: ${({ $hoverBg }) => $hoverBg};
  }

  &:focus-visible {
    outline: 0.2rem solid ${({ $focusBorder }) => $focusBorder};
    outline-offset: -0.2rem;
  }

  @media (prefers-reduced-motion: reduce) {
    transition: none;
    animation: none;
  }

  ${({ $animationCss }) => $animationCss || ''}
`;

const OptionName = styled.span`
  font-size: 1.4rem;
`;

const Checkmark = styled.span<{
  $visible: boolean;
  $accentColor: string;
}>`
  display: ${({ $visible }) => ($visible ? 'block' : 'none')};
  color: ${({ $accentColor }) => $accentColor};
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
                $active={isSelected}
                $pageBg={themeData?.background.page ?? '#000'}
                $textColor={themeData?.text.primary ?? '#fff'}
                $fontFamily={themeData?.meta.fontFamily ?? 'sans-serif'}
                $accentPrimary={themeData?.accent.primary ?? '#fff'}
                $borderRadius={themeData?.border.radius ?? '0.4rem'}
                $cardBorderStyle={themeData?.meta.cardBorderStyle ?? 'none'}
                $hoverBg={themeData?.background.cardHover ?? '#333'}
                $focusBorder={themeData?.border.focus ?? '#fff'}
                $animationCss={themeAnimations[theme.slug]}
                role="option"
                aria-selected={isSelected}
                tabIndex={index === activeIndex ? 0 : -1}
                onClick={() => handleSelect(theme.slug)}
                onKeyDown={(e) => handleOptionKeyDown(e, theme.slug, index)}
              >
                <OptionName>{theme.name}</OptionName>
                <Checkmark $visible={isSelected} $accentColor={themeData?.accent.primary ?? '#fff'}>
                  ✓
                </Checkmark>
              </ThemeOption>
            );
          })}
        </ThemeList>
      </Dropdown>
    </SwitcherWrapper>
  );
};
