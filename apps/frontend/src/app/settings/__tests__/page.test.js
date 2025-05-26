"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("@testing-library/react");
const page_1 = __importDefault(require("../page"));
const api_client_1 = require("@/lib/api-client");
// Mock the apiClient
jest.mock('@/lib/api-client', () => ({
    apiClient: {
        get: jest.fn(),
        put: jest.fn(),
    },
}));
// Mock the ProtectedRoute component
jest.mock('@/components/auth/protected-route', () => ({
    ProtectedRoute: ({ children }) => <div>{children}</div>,
}));
describe('SettingsPage', () => {
    const mockProfile = {
        id: '1',
        email: 'test@example.com',
        name: 'Test User',
        bio: 'Test bio',
        skills: ['skill1', 'skill2'],
    };
    beforeEach(() => {
        jest.clearAllMocks();
    });
    it('shows loading state initially', () => {
        api_client_1.apiClient.get.mockImplementation(() => new Promise(() => { }));
        (0, react_1.render)(<page_1.default />);
        // Check for spinner by class
        expect(document.querySelector('.animate-spin')).toBeInTheDocument();
    });
    it('renders profile data when loaded', async () => {
        api_client_1.apiClient.get.mockResolvedValue({ data: mockProfile });
        (0, react_1.render)(<page_1.default />);
        await (0, react_1.waitFor)(() => {
            expect(react_1.screen.getByDisplayValue('Test User')).toBeInTheDocument();
            expect(react_1.screen.getByDisplayValue('test@example.com')).toBeInTheDocument();
            expect(react_1.screen.getByDisplayValue('Test bio')).toBeInTheDocument();
        });
    });
    it('handles profile update', async () => {
        api_client_1.apiClient.get.mockResolvedValue({ data: mockProfile });
        api_client_1.apiClient.put.mockResolvedValue({ data: { ...mockProfile, name: 'Updated Name' } });
        (0, react_1.render)(<page_1.default />);
        await (0, react_1.waitFor)(() => {
            const nameInput = react_1.screen.getByLabelText('Name');
            react_1.fireEvent.change(nameInput, { target: { value: 'Updated Name' } });
            const saveButton = react_1.screen.getByText('Save Changes');
            react_1.fireEvent.click(saveButton);
        });
        await (0, react_1.waitFor)(() => {
            expect(api_client_1.apiClient.put).toHaveBeenCalledWith('/users/me', {
                ...mockProfile,
                name: 'Updated Name',
            });
        });
    });
    it('shows error message when API call fails', async () => {
        api_client_1.apiClient.get.mockRejectedValue({ response: { data: { message: 'Failed to fetch profile' } } });
        (0, react_1.render)(<page_1.default />);
        await (0, react_1.waitFor)(() => {
            expect(react_1.screen.getByText('Failed to fetch profile')).toBeInTheDocument();
        });
    });
});
