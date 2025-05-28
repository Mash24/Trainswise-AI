"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Sidebar = Sidebar;
const link_1 = __importDefault(require("next/link"));
const navigation_1 = require("next/navigation");
const utils_1 = require("@/lib/utils");
const auth_service_1 = require("@/lib/auth-service");
const lucide_react_1 = require("lucide-react");
const navigation = [
    { name: 'Dashboard', href: '/dashboard', icon: lucide_react_1.LayoutDashboard },
    { name: 'Tasks', href: '/tasks', icon: lucide_react_1.ClipboardList },
    { name: 'Reviews', href: '/reviews', icon: lucide_react_1.Star },
    { name: 'Settings', href: '/settings', icon: lucide_react_1.Settings },
];
function Sidebar() {
    const pathname = (0, navigation_1.usePathname)();
    const handleLogout = async () => {
        try {
            await auth_service_1.authService.logout();
        }
        catch (error) {
            console.error('Logout failed:', error);
        }
    };
    return (<aside className="flex h-full w-64 flex-col border-r bg-card" role="navigation" aria-label="Main navigation">
      <div className="flex h-14 items-center border-b px-4">
        <link_1.default href="/" className="flex items-center gap-2 font-semibold" aria-label="NexusLoop Home">
          <span className="text-xl">NexusLoop</span>
        </link_1.default>
      </div>
      <nav className="flex-1 space-y-1 p-4" aria-label="Navigation menu">
        {navigation.map((item) => {
            const isActive = pathname === item.href;
            return (<link_1.default key={item.name} href={item.href} className={(0, utils_1.cn)('flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors', isActive
                    ? 'bg-primary text-primary-foreground'
                    : 'text-muted-foreground hover:bg-muted hover:text-foreground')} aria-current={isActive ? 'page' : undefined}>
              <item.icon className="h-4 w-4" aria-hidden="true"/>
              {item.name}
            </link_1.default>);
        })}
      </nav>
      <div className="border-t p-4">
        <button className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm text-muted-foreground hover:bg-muted hover:text-foreground" onClick={handleLogout} aria-label="Logout">
          <lucide_react_1.LogOut className="h-4 w-4" aria-hidden="true"/>
          Logout
        </button>
      </div>
    </aside>);
}
