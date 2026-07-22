export const config = {
  apiUrl:
    import.meta.env.VITE_API_BASE_URL ||
    import.meta.env.VITE_API_URL ||
    "http://localhost:8000/api",

  wsUrl:
    import.meta.env.VITE_WS_BASE_URL ||
    "ws://localhost:8000",

  validate() {
    console.log("API URL:", this.apiUrl);
  },
};

config.validate();