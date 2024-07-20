import { useEffect, useRef, useState } from "react";

const DelayClick = ({
  handleClick,
  delay = 3000,
  children,
}: {
  handleClick: () => void;
  delay?: number;
  children: React.ReactNode;
}) => {
  const [isPressed, setIsPressed] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleMouseDown = () => {
    setIsPressed(true);
  };

  useEffect(() => {
    if (isPressed) {
      timeoutRef.current = setTimeout(() => {
        console.log("ASADA ", isPressed);
        if (isPressed) {
          console.log("IS PRESSED");
          handleClick();
        }
      }, delay);
    } else {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    }
  }, [isPressed]);

  const handleMouseUp = () => {
    setIsPressed(false);
  };

  return (
    <span
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      {children}
    </span>
  );
};

export default DelayClick;
