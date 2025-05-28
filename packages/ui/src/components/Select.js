"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Select = void 0;
const react_1 = __importDefault(require("react"));
const Select = ({ label, options, error, helperText, className = '', onChange, ...props }) => {
    const handleChange = (e) => {
        const select = e.target;
        if (onChange) {
            onChange(select.value);
        }
    };
    return (<div className="w-full">
      {label && (<label className="block text-sm font-medium text-gray-700 mb-1">
          {label}
        </label>)}
      <select className={`
          w-full px-3 py-2 border rounded-md shadow-sm
          focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
          ${error ? 'border-red-500' : 'border-gray-300'}
          ${className}
        `} onChange={handleChange} {...props}>
        {options.map((option) => (<option key={option.value} value={option.value}>
            {option.label}
          </option>))}
      </select>
      {(error || helperText) && (<p className={`mt-1 text-sm ${error ? 'text-red-500' : 'text-gray-500'}`}>
          {error || helperText}
        </p>)}
    </div>);
};
exports.Select = Select;
