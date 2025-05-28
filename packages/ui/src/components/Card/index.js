"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Card = void 0;
const react_1 = __importDefault(require("react"));
const Card = ({ children, className = '' }) => {
    return (<div className={`bg-white rounded-lg shadow-md p-6 ${className}`}>
      {children}
    </div>);
};
exports.Card = Card;
