import React from 'react';
interface CardProps {
    children: React.ReactNode;
    className?: string;
}
export declare const Card: React.FC<CardProps>;
interface CardHeaderProps {
    children: React.ReactNode;
    className?: string;
}
export declare const CardHeader: React.FC<CardHeaderProps>;
interface CardContentProps {
    children: React.ReactNode;
    className?: string;
}
export declare const CardContent: React.FC<CardContentProps>;
interface CardFooterProps {
    children: React.ReactNode;
    className?: string;
}
export declare const CardFooter: React.FC<CardFooterProps>;
export {};
