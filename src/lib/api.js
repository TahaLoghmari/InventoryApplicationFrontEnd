export const API_BASE_URL =
  import.meta.env.VITE_API_URL ||
  (import.meta.env.PROD
    ? "https://your-backend-domain.com/api"
    : "http://localhost:3000/api");
