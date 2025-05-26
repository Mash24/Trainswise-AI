"use strict";
'use client';
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = SettingsPage;
const react_1 = require("react");
const protected_route_1 = require("@/components/auth/protected-route");
const api_client_1 = require("@/lib/api-client");
function SettingsPage() {
    const [profile, setProfile] = (0, react_1.useState)(null);
    const [isLoading, setIsLoading] = (0, react_1.useState)(true);
    const [error, setError] = (0, react_1.useState)('');
    const [isSaving, setIsSaving] = (0, react_1.useState)(false);
    (0, react_1.useEffect)(() => {
        const fetchProfile = async () => {
            try {
                const response = await api_client_1.apiClient.get('/users/me');
                setProfile(response.data);
            }
            catch (err) {
                setError(err.response?.data?.message || 'Failed to fetch profile');
            }
            finally {
                setIsLoading(false);
            }
        };
        fetchProfile();
    }, []);
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!profile)
            return;
        setIsSaving(true);
        try {
            await api_client_1.apiClient.put('/users/me', profile);
        }
        catch (err) {
            setError(err.response?.data?.message || 'Failed to update profile');
        }
        finally {
            setIsSaving(false);
        }
    };
    if (isLoading) {
        return (<protected_route_1.ProtectedRoute>
        <div className="flex h-32 items-center justify-center">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
        </div>
      </protected_route_1.ProtectedRoute>);
    }
    return (<protected_route_1.ProtectedRoute>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Settings</h1>
          <p className="text-muted-foreground">
            Manage your account settings and preferences
          </p>
        </div>

        {error && (<div className="rounded-md bg-destructive/15 p-3 text-sm text-destructive">
            {error}
          </div>)}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-foreground">
                Name
              </label>
              <input id="name" type="text" value={profile?.name || ''} onChange={(e) => setProfile((prev) => prev && { ...prev, name: e.target.value })} className="mt-1 block w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"/>
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-foreground">
                Email
              </label>
              <input id="email" type="email" value={profile?.email || ''} disabled className="mt-1 block w-full rounded-md border border-input bg-muted px-3 py-2 text-sm text-muted-foreground"/>
            </div>

            <div>
              <label htmlFor="bio" className="block text-sm font-medium text-foreground">
                Bio
              </label>
              <textarea id="bio" value={profile?.bio || ''} onChange={(e) => setProfile((prev) => prev && { ...prev, bio: e.target.value })} rows={4} className="mt-1 block w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"/>
            </div>
          </div>

          <button type="submit" disabled={isSaving} className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 disabled:opacity-50">
            {isSaving ? 'Saving...' : 'Save Changes'}
          </button>
        </form>
      </div>
    </protected_route_1.ProtectedRoute>);
}
