import runtimeEnv from "@mars/heroku-js-runtime-env";

const env = runtimeEnv();
const apiBaseURL = env.REACT_APP_BASE_API;

export default apiBaseURL;
