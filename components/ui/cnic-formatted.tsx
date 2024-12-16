import React from 'react';
import { Input } from './input';

interface CNICInputProps {
  value: string;
  onChangeText: (text: string) => void;
  className?: string;
  placeholder?: string;
}

const CNICInput: React.FC<CNICInputProps> = ({
  value,
  onChangeText,
  className = "",
  placeholder = "00000-0000000-0"
}) => {
  const formatCNIC = (text: string) => {
    const cleaned = text.replace(/[^0-9]/g, '');
    
    let formatted = cleaned;
    if (cleaned.length > 5) {
      formatted = `${cleaned.slice(0, 5)}-${cleaned.slice(5)}`;
    }
    if (cleaned.length > 12) {
      formatted = `${formatted.slice(0, 13)}-${formatted.slice(13)}`;
    }
    
    formatted = formatted.slice(0, 15);
    
    return formatted;
  };

  const handleChange = (text: string) => {
    const formatted = formatCNIC(text);
    onChangeText(formatted);
  };

  return (
    <Input
      value={value}
      onChangeText={handleChange}
      placeholder={placeholder}
      keyboardType="numeric"
      maxLength={15}
      className={className}
    />
  );
};

export default CNICInput;