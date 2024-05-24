import React, { ChangeEvent, FocusEvent } from 'react';
import "./CustomInput.css"

interface CustomInputProps {
  id: string;
  label: string;
  type?: string;
  value: string;
  placeholder?: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: FocusEvent<HTMLInputElement>) => void;
  className?: string;
  required?: boolean;  
}

const formatCPF = (value: string): string => {
  const numbers = value.replace(/\D/g, '');

  const cpf = numbers
    .slice(0, 11) 
    .replace(/(\d{3})(\d)/, '$1.$2') 
    .replace(/(\d{3})(\d)/, '$1.$2') 
    .replace(/(\d{3})(\d{1,2})$/, '$1-$2'); 
  return cpf;
};

const CustomInput: React.FC<CustomInputProps> = ({
  id,
  label,
  type = 'text',
  value,
  placeholder = '',
  onChange,
  onBlur,
  className,
  required = false  
}) => {
  const handleCPFChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (type === 'cpf') {
      const formattedValue = formatCPF(e.target.value);
      onChange({ ...e, target: { ...e.target, value: formattedValue } });
    } else {
      onChange(e);
    }
  };

  return (
    <div className={`custom-input-container ${className}`}>
      <label htmlFor={id}>{label} {required && <span className="required-indicator">*</span>}</label>
      <input
        id={id}
        type={type === 'cpf' ? 'text' : type}
        value={value}
        placeholder={placeholder}
        onChange={handleCPFChange}
        onBlur={onBlur}
        required={required}
      />
    </div>
  );
};

export default CustomInput;
