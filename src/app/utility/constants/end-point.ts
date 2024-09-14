import { environment } from "src/app/environments/environment";

const HOST = environment.host;
const PORT = environment.port;

export const SECURE = true;
export const NON_SECURE = false;

export const getEndpoint = (isHttps: boolean, path: string) => {
  return `${isHttps ? 'https' : 'http'}://${HOST}${PORT}/${path}/api/v1`;
};



