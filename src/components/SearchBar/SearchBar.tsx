import React from 'react';
import './SearchBar.css';

interface SearchBarProps {
  placeholder: string;
  value: string;
  onChange: (value: any) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ placeholder, value, onChange }) => {
  return (
    <input
      type="text"
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className="search-bar"
    />
  );
};

export default SearchBar;
