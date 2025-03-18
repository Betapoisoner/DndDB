/**
 * Environment variable validation and type safety
 * Uses envalid for robust env var handling
 */
import { cleanEnv, str, num } from 'envalid';
import { config } from 'dotenv';

// Load environment variables before validation to support multiple environments
config({ path: process.env.ENV_PATH || '.env' });

/**
 * Validated environment variables
 * @typedef {Object} EnvVars
 * @property {string} DB_TYPE - Database username
 * @property {string} DB_USER - Database username
 * @property {string} DB_HOST - Database host address
 * @property {string} DB_NAME - Database name
 * @property {string} DB_PASSWORD - Database password
 * @property {number} DB_PORT - Database port (default: 5432)

 */
export const env = cleanEnv(process.env, {
    DB_TYPE: str({ desc: 'Database Type' }),
    DB_USER: str({ desc: 'Database username' }),
    DB_HOST: str({ desc: 'Database host address' }),
    DB_NAME: str({ desc: 'Database name' }),
    DB_PASSWORD: str({ desc: 'Database password' }),
    DB_PORT: num({ default: 5432, desc: 'Database port' }),

});
