import React from 'react';
export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string;
}
export declare const Input: React.FC<InputProps>;
