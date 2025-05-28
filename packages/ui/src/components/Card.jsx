"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CardFooter = exports.CardContent = exports.CardHeader = exports.Card = void 0;
const react_1 = __importDefault(require("react"));
const Card = ({ children, className = '' }) => {
    return (<div className={`bg-white rounded-lg shadow-md p-6 ${className}`}>
      {children}
    </div>);
};
exports.Card = Card;
const CardHeader = ({ children, className = '' }) => {
    return (<div className={`mb-4 ${className}`}>
      {children}
    </div>);
};
exports.CardHeader = CardHeader;
const CardContent = ({ children, className = '' }) => {
    return (<div className={className}>
      {children}
    </div>);
};
exports.CardContent = CardContent;
const CardFooter = ({ children, className = '' }) => {
    return (<div className={`mt-4 pt-4 border-t border-gray-200 ${className}`}>
      {children}
    </div>);
};
exports.CardFooter = CardFooter;
