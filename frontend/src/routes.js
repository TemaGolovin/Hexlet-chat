const apiPath = "api/v1";

export const appPaths = {
  login: "/login",
  chat: "/",
  notFound: "*",
};

export const apiRoutes = {
  login: () => [apiPath, "login"].join("/"),
};
