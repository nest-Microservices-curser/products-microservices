import 'dotenv/config';
import * as joi from 'joi'

interface EnvConfig {

    PORT: number;
    DATABASE_URL: string;
}

const ensSchema = joi.object({
    PORT: joi.number().required(),
    DATABASE_URL: joi.string().required(),
})
    .unknown(true) // allow other keys

const { error, value } = ensSchema.validate(process.env)
if (error) {
    throw new Error(`Config validation error: ${error.message}`)
}

const envVars: EnvConfig = value;

export const envs = {
    port: envVars.PORT,
    databaseUrl: envVars.DATABASE_URL,
}