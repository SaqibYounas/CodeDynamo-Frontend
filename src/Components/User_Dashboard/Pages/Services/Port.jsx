const baseUrl = ' ';
const port = import.meta.env.VITE_PORT;

export const url = baseUrl ? (port ? `${baseUrl}:${port}` : baseUrl) : null;
