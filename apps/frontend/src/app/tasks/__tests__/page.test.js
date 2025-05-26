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
    },
}));
// Mock the ProtectedRoute component
jest.mock('@/components/auth/protected-route', () => ({
    ProtectedRoute: ({ children }) => <div>{children}</div>,
}));
describe('TasksPage', () => {
    const mockTasks = [
        {
            id: '1',
            title: 'Task 1',
            description: 'Description 1',
            reward: 100,
            deadline: new Date('2024-12-31').toISOString(),
            status: 'OPEN',
            tags: ['tag1', 'tag2'],
        },
        {
            id: '2',
            title: 'Task 2',
            description: 'Description 2',
            reward: 200,
            deadline: new Date('2024-12-31').toISOString(),
            status: 'IN_PROGRESS',
            tags: ['tag3'],
        },
    ];
    beforeEach(() => {
        jest.clearAllMocks();
    });
    it('shows loading state initially', () => {
        api_client_1.apiClient.get.mockImplementation(() => new Promise(() => { }));
        (0, react_1.render)(<page_1.default />);
        expect(document.querySelector('.animate-spin')).toBeInTheDocument();
    });
    it('renders tasks when data is loaded', async () => {
        api_client_1.apiClient.get.mockResolvedValue({ data: mockTasks });
        (0, react_1.render)(<page_1.default />);
        await (0, react_1.waitFor)(() => {
            expect(react_1.screen.getByText('Task 1')).toBeInTheDocument();
            expect(react_1.screen.getByText('Task 2')).toBeInTheDocument();
        });
    });
    it('shows error message when API call fails', async () => {
        api_client_1.apiClient.get.mockRejectedValue({ response: { data: { message: 'Error loading tasks' } } });
        (0, react_1.render)(<page_1.default />);
        await (0, react_1.waitFor)(() => {
            expect(react_1.screen.getByText('Error loading tasks')).toBeInTheDocument();
        });
    });
});
