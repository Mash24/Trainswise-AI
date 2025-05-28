import React from 'react';
interface Option {
    value: string;
    label: string;
}
interface SelectProps extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, 'onChange'> {
    label?: string;
    options: Option[];
    error?: string;
    helperText?: string;
    onChange?: (value: string) => void;
}
export declare const Select: React.FC<SelectProps>;
export {};
