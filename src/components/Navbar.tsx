import React from 'react';
import styled from '@emotion/styled';
import { NavLink } from 'react-router-dom';

const Nav = styled.nav<IThemeProps>`
  display: flex;
  margin-bottom: 20px;
  background-color: ${({ theme }) => theme.color.white_100};
  border-top: 1px solid ${({ theme }) => theme.color.gray_400};
  box-shadow: ${({ theme }) => theme.shadow.s};
  border-radius: 0 0 8px 8px;
  overflow: hidden;
  a {
    padding: 20px 30px;
    color: ${({ theme }) => theme.color.black_300};
    text-decoration: none;
    background-color: ${({ theme }) => theme.color.white_100};
    &:hover {
      filter: brightness(0.97);
    }
    &.active{
      font-weight: 700;
      filter: brightness(0.95);
      box-shadow: inset ${({ theme }) => theme.shadow.s};
    }
  }
`;

interface INavbarProps {
  links: INavLink[];
}

const Navbar: React.FC<INavbarProps> = ({ links }) => (
  <Nav>
    {
      links.map((link) => (
        <NavLink
          key={link.to}
          to={link.to}
          end
          className={({ isActive }) => (isActive ? 'active' : '')}
        >{link.title}
        </NavLink>
      ))
    }
  </Nav>
);

export default Navbar;
