"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("@testing-library/jest-dom");
const react_1 = require("@testing-library/react");
// Configure testing-library
(0, react_1.configure)({
    testIdAttribute: 'data-testid',
});
// Mock next-themes
jest.mock('next-themes', () => ({
    useTheme: () => ({
        theme: 'light',
        setTheme: jest.fn(),
    }),
}));
