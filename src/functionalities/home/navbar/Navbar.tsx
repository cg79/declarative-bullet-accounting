import { Menubar } from 'primereact/menubar';
import { MenuItem } from 'primereact/menuitem';
import { useNavigate } from 'react-router-dom';
import useIdentity from '../../../_store/useIdentity';
import { SvgSalary } from '../../../_components/svgs/svg-salary';
import { useBetween } from '../../../hooks/useBetween';
import './navbar.css';
import NavItem, { NavItemProps } from './nav-item';
import { MegaMenu } from 'primereact/megamenu';
import { TieredMenu } from 'primereact/tieredmenu';
import useTranslations from '../../translations/useTranslations';
import React from 'react';

export const Navbar = () => {
  const { currentTranslation } = useBetween(useTranslations);
  const { loggedUser, deconectare } = useBetween(useIdentity);
  const navigate = useNavigate();

  const [isMenuVisible, setIsMenuVisible] = React.useState(false);

  const toggleMenu = () => {
    setIsMenuVisible(!isMenuVisible);
  };

  const items: MenuItem[] = [
    {
      label: 'Logare',
      icon: (
        <div className="mr5">
          <SvgSalary></SvgSalary>
        </div>
      ),

      command: () => {
        navigate('/login');
      },
      visible: !!!loggedUser,
    },

    {
      label: 'Utilizator',
      template: ({}) => <div>{loggedUser?.nick || 'no nick'}</div>,
      icon: 'pi pi-fw pi-file',
      items: [
        {
          label: 'Deconectare',
          icon: 'pi pi-fw pi-power-off',
          command: () => {
            deconectare();
            navigate('/login');
          },
          visible: !!loggedUser,
        },
      ],
      // visible: !!loggedUser,
    },
  ];

  const navItems: NavItemProps[] = [
    {
      label: 'Home',
      icon: 'pi pi-fw pi-home',
      route: '/',
      navbarClick: toggleMenu,
    },
    {
      label: currentTranslation.HEADERS.Accounts,
      icon: 'pi pi-fw pi-building',
      route: '/accounts',
      visible: !!loggedUser,
      navbarClick: toggleMenu,
    },
    {
      label: currentTranslation.HEADERS.Invitations,
      icon: 'pi pi-fw pi-external-link',
      route: '/entity-invitations',
      visible: !!loggedUser && !loggedUser?.isInvited,
      navbarClick: toggleMenu,
    },
    {
      label: currentTranslation.HEADERS.Events,
      icon: 'pi pi-fw pi-external-link',
      route: '/events',
      visible: !!loggedUser && !loggedUser?.isInvited,
      navbarClick: toggleMenu,
    },
    {
      label: currentTranslation.HEADERS.Money_aggregator,
      icon: 'pi pi-fw pi-calculator',
      route: '/categories',
      visible: !!loggedUser,
      navbarClick: toggleMenu,
    },
    // {
    //   label: loggedUser?.nick || 'no nick',
    //   icon: 'pi pi-fw pi-calculator',
    //   route: '/login',
    //   visible: !!loggedUser,
    // },
  ];

  return (
    <>
      <div className="nav img_bk">
        <input
          type="checkbox"
          id="nav-check"
          checked={isMenuVisible}
          onClick={toggleMenu}
        />
        <div className="nav-header"></div>
        <div className="nav-btn">
          <label htmlFor="nav-check">
            <span></span>
            <span></span>
            <span></span>
          </label>
        </div>

        <span className="nav-title1 ">
          <img src="/images/money-bag1.png"></img>
          {loggedUser && (
            <NavItem
              label={loggedUser?.nick || 'no nick'}
              route="/login"
              navbarClick={toggleMenu}
            ></NavItem>
          )}
        </span>
        <div className="nav-links">
          {navItems
            .filter((item) => item.visible)
            .map((item, index) => (
              <NavItem key={index} {...item}></NavItem>
            ))}
          {loggedUser && (
            // <a href="#" onClick={() => deconectare()}>
            //   {currentTranslation.HEADERS.Logout}
            // </a>
            <NavItem
              label={currentTranslation.HEADERS.Logout}
              route="/login"
              navbarClick={() => {
                deconectare();
                toggleMenu();
              }}
            ></NavItem>
          )}
          {!loggedUser && (
            <NavItem
              label={currentTranslation.HEADERS.Login}
              route="/login"
              navbarClick={toggleMenu}
            ></NavItem>
          )}
        </div>
      </div>
      {/* <div className="img_bk">
        <Menubar model={items} />
      </div> */}
    </>
  );
};
