import fs from "fs";
import YAML from "yaml";

export const config = {
  sessionSecret:  process.env.SESSION_SECRET || "dfjjfvhsdysfysd",
  secret:  process.env.SECRET || "bprl5050",
  superuser: process.env.superuser ? process.env.superuser : "damasceno",
  apikeys: process.env.APIKEYS ? process.env.APIKEYS : "./config/parameters.yml",
  redisString: {
    host: process.env.REDIS_HOST || "redis",
    port: process.env.REDIS_PORT?Number.parseInt(process.env.REDIS_PORT) : 6379,
    uri: process.env.REDIS_URI || "redis://redis:6379/0",
    db: process.env.REDIS_DB ? Number.parseInt(process.env.REDIS_DB): 0,
  },
  refreshInterval: process.env.REFRESH_INTERVAL || "3600",
  isProduction: process.env.NODE_ENV === "production",
};

export const opt = YAML.parse(fs.readFileSync(config.apikeys, "utf8"));

// TODO: encontrar como ocultar dos logs senhas e outros dados sensíveis
// console.log(config)
// module.exports = config;
//export default config;
