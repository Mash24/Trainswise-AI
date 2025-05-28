"use strict";
'use client';
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProtectedRoute = ProtectedRoute;
const react_1 = require("react");
const navigation_1 = require("next/navigation");
const api_client_1 = require("@/lib/api-client");
function ProtectedRoute({ children }) {
    const router = (0, navigation_1.useRouter)();
    const [isLoading, setIsLoading] = (0, react_1.useState)(true);
    (0, react_1.useEffect)(() => {
        const checkAuth = async () => {
            try {
                await api_client_1.authApi.getCurrentUser();
                setIsLoading(false);
            }
            catch (error) {
                router.push('/login');
            }
        };
        checkAuth();
    }, [router]);
    if (isLoading) {
        return (<div className="flex h-screen items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
      </div>);
    }
    return <>{children}</>;
}
