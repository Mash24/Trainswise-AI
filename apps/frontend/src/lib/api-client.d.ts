export declare const apiClient: import("axios").AxiosInstance;
export declare const authApi: {
    login: (email: string, password: string) => Promise<any>;
    logout: () => void;
    getCurrentUser: () => Promise<any>;
};
