"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Sidebar = Sidebar;
const link_1 = __importDefault(require("next/link"));
const navigation_1 = require("next/navigation");
const utils_1 = require("@/lib/utils");
const lucide_react_1 = require("lucide-react");
const navigation = [
    { name: 'Dashboard', href: '/dashboard', icon: lucide_react_1.LayoutDashboard },
    { name: 'Tasks', href: '/tasks', icon: lucide_react_1.ClipboardList },
    { name: 'Reviews', href: '/reviews', icon: lucide_react_1.Star },
    { name: 'Settings', href: '/settings', icon: lucide_react_1.Settings },
];
function Sidebar() {
    const pathname = (0, navigation_1.usePathname)();
    return (<div className="flex h-full w-64 flex-col border-r bg-card">
      <div className="flex h-14 items-center border-b px-4">
        <link_1.default href="/" className="flex items-center gap-2 font-semibold">
          <span className="text-xl">NexusLoop</span>
        </link_1.default>
      </div>
      <nav className="flex-1 space-y-1 p-4">
        {navigation.map((item) => {
            const isActive = pathname === item.href;
            return (<link_1.default key={item.name} href={item.href} className={(0, utils_1.cn)('flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors', isActive
                    ? 'bg-primary text-primary-foreground'
                    : 'text-muted-foreground hover:bg-muted hover:text-foreground')}>
              <item.icon className="h-4 w-4"/>
              {item.name}
            </link_1.default>);
        })}
      </nav>
      <div className="border-t p-4">
        <button className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm text-muted-foreground hover:bg-muted hover:text-foreground" onClick={() => {
            // TODO: Implement logout
        }}>
          <lucide_react_1.LogOut className="h-4 w-4"/>
          Logout
        </button>
      </div>
    </div>);
}
