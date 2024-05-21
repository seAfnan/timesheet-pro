// this file is for type safety and auto-completion of .env variables

declare namespace NodeJS {
  export interface ProcessEnv {
    DATABASE_URL: string;
    jwtSecretKey: string;
    jwtRefreshToken: string;
  }
}
