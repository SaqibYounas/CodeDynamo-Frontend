const port = 8004;
const baseUrl = import.meta.env.VITE_URL;
const loginBackendUrl = import.meta.env.LOGIN_BACKEND_URL;
export const url = port ? `${baseUrl}:${port}` : loginBackendUrl;
