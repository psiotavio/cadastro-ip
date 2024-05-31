import React from 'react';
import './CustomDropDown.css'; 

interface CustomDropdownProps {
  id: string;
  label: string;
  items: { label: string; value: string }[]; 
  value: string; 
  onChange: (value: string) => void; 
  className?: string;
  required?: boolean; 
}

const CustomDropdown: React.FC<CustomDropdownProps> = ({
  id,
  label,
  items,
  value,
  onChange,
  className,
  required = false
}) => {
  return (
    <div className={`custom-dropdown-container ${className}`}>
    <label htmlFor={id}>{label} {required && <span className="required-indicator">*</span>}</label>
    <select id={id} value={value} onChange={(e) => onChange(e.target.value)} required={required}>
      <option value="" disabled>
        Escolha uma opção
      </option>
      {items.map(item => (
        <option key={item.value} value={item.value}>
          {item.label}
        </option>
      ))}
    </select>
  </div>
  );
};

export default CustomDropdown;
