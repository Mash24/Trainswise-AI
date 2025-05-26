"use strict";
'use client';
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = DashboardPage;
const protected_route_1 = require("@/components/auth/protected-route");
function DashboardPage() {
    return (<protected_route_1.ProtectedRoute>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground">
            Welcome to your dashboard. Here's an overview of your activities.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <div className="rounded-lg border bg-card p-6">
            <h2 className="text-lg font-semibold">Active Tasks</h2>
            <p className="mt-2 text-3xl font-bold">0</p>
          </div>
          <div className="rounded-lg border bg-card p-6">
            <h2 className="text-lg font-semibold">Completed Tasks</h2>
            <p className="mt-2 text-3xl font-bold">0</p>
          </div>
          <div className="rounded-lg border bg-card p-6">
            <h2 className="text-lg font-semibold">Total Earnings</h2>
            <p className="mt-2 text-3xl font-bold">$0.00</p>
          </div>
        </div>
      </div>
    </protected_route_1.ProtectedRoute>);
}
