import React, { ChangeEvent, FocusEvent } from 'react';
import '../Input/CustomInput.css';
import './CustomDatePicker.css'; 

interface CustomDatePickerProps {
  id: string;
  label: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: FocusEvent<HTMLInputElement>) => void;
  className?: string;
  min?: string; 
  max?: string; 
  required?: boolean;
}

const CustomDatePicker: React.FC<CustomDatePickerProps> = ({
  id,
  label,
  value,
  onChange,
  onBlur,
  className,
  min,
  max,
  required = false
}) => {
  return (
    <div className={`custom-input-container ${className}`}>
      <label htmlFor={id}>{label} {required && <span className="required-indicator">*</span>}</label>
      <input
        id={id}
        type="date"
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        min={min}
        max={max}
        required={required}
        className="date-picker-input"
      />
    </div>
  );
};

export default CustomDatePicker;
