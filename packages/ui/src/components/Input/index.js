"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Input = void 0;
const react_1 = __importDefault(require("react"));
const Input = ({ label, error, className = '', ...props }) => {
    return (<div className="flex flex-col gap-1">
      {label && (<label className="text-sm font-medium text-gray-700">
          {label}
        </label>)}
      <input className={`px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${error ? 'border-red-500' : 'border-gray-300'} ${className}`} {...props}/>
      {error && (<span className="text-sm text-red-500">{error}</span>)}
    </div>);
};
exports.Input = Input;
