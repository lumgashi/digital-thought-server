export type AllConfigTypes = {
  app: AppConfig;
  database: DatabaseConfig;
  mail: MailConfig;
};

export type AppConfig = {
  nodeEnv: string;
  name: string;
  description: string;
  version: string;
  apiPrefix: string;
  frontendDomain?: string;
  jwtSecret: string;
  port: string;
};

export type DatabaseConfig = {
  mongoUri?: string;
};

export type MailConfig = {
  port: number;
  host?: string;
  user?: string;
  password?: string;
  defaultEmail?: string;
  defaultName?: string;
  ignoreTLS: boolean;
  secure: boolean;
  requireTLS: boolean;
};
