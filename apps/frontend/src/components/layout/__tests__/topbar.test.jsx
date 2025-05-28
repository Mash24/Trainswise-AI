"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("@testing-library/react");
const next_themes_1 = require("next-themes");
const topbar_1 = require("../topbar");
// Mock next-themes
jest.mock('next-themes', () => ({
    useTheme: () => ({
        theme: 'light',
        setTheme: jest.fn(),
    }),
}));
describe('Topbar', () => {
    const renderTopbar = () => {
        return (0, react_1.render)(<next_themes_1.ThemeProvider attribute="class" defaultTheme="light">
        <topbar_1.Topbar />
      </next_themes_1.ThemeProvider>);
    };
    it('renders the dashboard title', () => {
        renderTopbar();
        expect(react_1.screen.getByText('Dashboard')).toBeInTheDocument();
    });
    it('renders theme toggle button with correct aria label', () => {
        renderTopbar();
        const themeButton = react_1.screen.getByRole('button', { name: /switch to dark theme/i });
        expect(themeButton).toBeInTheDocument();
    });
    it('renders notification button with correct aria label', () => {
        renderTopbar();
        const notificationButton = react_1.screen.getByRole('button', { name: /view notifications/i });
        expect(notificationButton).toBeInTheDocument();
    });
    it('renders profile avatar with correct attributes', () => {
        renderTopbar();
        const profileAvatar = react_1.screen.getByRole('img', { name: /profile avatar/i });
        expect(profileAvatar).toBeInTheDocument();
        expect(profileAvatar).toHaveAttribute('data-testid', 'profile-avatar');
    });
    it('toggles theme when theme button is clicked', () => {
        const mockSetTheme = jest.fn();
        jest.spyOn(require('next-themes'), 'useTheme').mockImplementation(() => ({
            theme: 'light',
            setTheme: mockSetTheme,
        }));
        renderTopbar();
        const themeButton = react_1.screen.getByRole('button', { name: /switch to dark theme/i });
        react_1.fireEvent.click(themeButton);
        expect(mockSetTheme).toHaveBeenCalledWith('dark');
    });
    it('renders with correct semantic HTML structure', () => {
        renderTopbar();
        expect(react_1.screen.getByRole('banner')).toBeInTheDocument();
    });
});
