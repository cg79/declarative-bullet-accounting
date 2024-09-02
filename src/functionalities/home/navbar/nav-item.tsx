import { useNavigate } from 'react-router-dom';
export interface NavItemProps {
  className?: string;
  route: string;
  icon?: string;
  label: string;
  visible?: boolean;
  navbarClick: () => void;
}

function NavItem(props: NavItemProps) {
  const navigate = useNavigate();
  return (
    <div
      className="nav-item"
      onClick={() => {
        navigate(props.route);
        props.navbarClick();
      }}
    >
      {props.label}
    </div>
  );
}

export default NavItem;
