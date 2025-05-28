"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Input = void 0;
const react_1 = __importDefault(require("react"));
const Input = ({ label, error, helperText, className = '', ...props }) => {
    return (<div className="w-full">
      {label && (<label className="block text-sm font-medium text-gray-700 mb-1">
          {label}
        </label>)}
      <input className={`
          w-full px-3 py-2 border rounded-md shadow-sm
          focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
          ${error ? 'border-red-500' : 'border-gray-300'}
          ${className}
        `} {...props}/>
      {(error || helperText) && (<p className={`mt-1 text-sm ${error ? 'text-red-500' : 'text-gray-500'}`}>
          {error || helperText}
        </p>)}
    </div>);
};
exports.Input = Input;
