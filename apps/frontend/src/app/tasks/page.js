"use strict";
'use client';
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = TasksPage;
const react_1 = require("react");
const protected_route_1 = require("@/components/auth/protected-route");
const task_card_1 = require("@/components/tasks/task-card");
const api_client_1 = require("@/lib/api-client");
function TasksPage() {
    const [tasks, setTasks] = (0, react_1.useState)([]);
    const [isLoading, setIsLoading] = (0, react_1.useState)(true);
    const [error, setError] = (0, react_1.useState)('');
    (0, react_1.useEffect)(() => {
        const fetchTasks = async () => {
            try {
                const response = await api_client_1.apiClient.get('/tasks');
                setTasks(response.data);
            }
            catch (err) {
                setError(err.response?.data?.message || 'Failed to fetch tasks');
            }
            finally {
                setIsLoading(false);
            }
        };
        fetchTasks();
    }, []);
    return (<protected_route_1.ProtectedRoute>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Tasks</h1>
          <p className="text-muted-foreground">
            Browse and manage your AI training tasks
          </p>
        </div>

        {error && (<div className="rounded-md bg-destructive/15 p-3 text-sm text-destructive">
            {error}
          </div>)}

        {isLoading ? (<div className="flex h-32 items-center justify-center">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
          </div>) : (<div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {tasks.map((task) => (<task_card_1.TaskCard key={task.id} {...task}/>))}
          </div>)}
      </div>
    </protected_route_1.ProtectedRoute>);
}
