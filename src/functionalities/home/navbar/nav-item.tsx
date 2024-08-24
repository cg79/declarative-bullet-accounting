import { useNavigate } from "react-router-dom";
export interface NavItemProps {
  className?: string;
  route: string;
  icon?: string;
  label: string;
  visible?: boolean;
}

function NavItem(props: NavItemProps) {
  const navigate = useNavigate();
  return (
    <a href="#" onClick={() => navigate(props.route)}>
      {props.label}
    </a>
  );
}

export default NavItem;
