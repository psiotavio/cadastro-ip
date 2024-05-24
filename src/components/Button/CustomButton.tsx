import React from 'react';
import './CustomButton.css';

interface CustomButtonProps {
  text: string;
  onClick: () => void;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  className?: string;
}

const CustomButton: React.FC<CustomButtonProps> = ({
  text,
  onClick,
  type = 'button',
  disabled = false,
  className
}) => {
  return (
    <button
      className={`custom-button ${className}`}
      onClick={onClick}
      type={type}
      disabled={disabled}
    >
      {text}
    </button>
  );
};

export default CustomButton;
