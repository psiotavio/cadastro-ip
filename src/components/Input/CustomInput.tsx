import React from 'react';
import "./CustomInput.css"

interface CustomInputProps {
  id: string;
  label: string;
  type?: string;
  value: string;
  placeholder?: string;
  onChange: (value: any) => void;
  onBlur?: (value: any) => void;
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
  const handleCPFChange = (cpf: any) => {
    if (type === 'cpf') {
      const formattedCPF = formatCPF(cpf.target.value);
      onChange({ ...cpf, target: { ...cpf.target, value: formattedCPF } });
    } else {
      onChange(cpf);
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
