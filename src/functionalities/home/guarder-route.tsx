import { ReactNode } from "react";
import { Navigate } from "react-router-dom";

const GuardedRoute1 = ({
  children,
  loggedUser,
}: {
  children: ReactNode;
  loggedUser: any;
}) => {
  if (!loggedUser) return <Navigate to="/login" />;

  return <div>{children}</div>;
};

export default GuardedRoute1;
