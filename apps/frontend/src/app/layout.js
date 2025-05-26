"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.metadata = void 0;
exports.default = RootLayout;
const google_1 = require("next/font/google");
const theme_provider_1 = require("@/components/providers/theme-provider");
const sidebar_1 = require("@/components/layout/sidebar");
const topbar_1 = require("@/components/layout/topbar");
require("./globals.css");
const inter = (0, google_1.Inter)({
    subsets: ['latin'],
    variable: '--font-inter',
});
exports.metadata = {
    title: 'NexusLoop - AI Training Jobs',
    description: 'Platform for AI training jobs and tasks',
};
function RootLayout({ children, }) {
    return (<html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} antialiased`}>
        <theme_provider_1.ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <div className="flex h-screen">
            <sidebar_1.Sidebar />
            <div className="flex flex-1 flex-col">
              <topbar_1.Topbar />
              <main className="flex-1 overflow-auto p-6">
                {children}
              </main>
            </div>
          </div>
        </theme_provider_1.ThemeProvider>
      </body>
    </html>);
}
