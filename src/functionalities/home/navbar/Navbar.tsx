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

export const Navbar = () => {
  const { loggedUser, deconectare } = useBetween(useIdentity);
  const navigate = useNavigate();

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
    },
    {
      label: 'Conturi',
      icon: 'pi pi-fw pi-building',
      route: '/accounts',
      visible: !!loggedUser,
    },
    {
      label: 'Invitatii',
      icon: 'pi pi-fw pi-external-link',
      route: '/entity-invitations',
      visible: !!loggedUser && !loggedUser?.isInvited,
    },
    {
      label: 'Entitati',
      icon: 'pi pi-fw pi-external-link',
      route: '/entities',
      visible: !!loggedUser && !loggedUser?.isInvited,
    },
    {
      label: 'Money Aggregator',
      icon: 'pi pi-fw pi-calculator',
      route: '/categories',
      visible: !!loggedUser,
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
        <input type="checkbox" id="nav-check" />
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
            ></NavItem>
          )}
        </span>
        <div className="nav-links">
          {navItems.map((item, index) => (
            <NavItem key={index} {...item}></NavItem>
          ))}
          {loggedUser && (
            <a href="#" onClick={() => deconectare()}>
              Logout
            </a>
          )}
          {!loggedUser && <NavItem label="Login" route="/login"></NavItem>}
        </div>
      </div>
      {/* <div className="img_bk">
        <Menubar model={items} />
      </div> */}
    </>
  );
};
