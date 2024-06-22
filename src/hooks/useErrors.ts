import { useState } from "react";

const useErrors = () => {
  const [errors, setErrors] = useState([]);
  return { errors, setErrors };
};
export default useErrors;
