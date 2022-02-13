import { registerAs } from '@nestjs/config';

export default registerAs('mysql', () => ({
    dialect: process.env.DB_DIALECT || 'mysql',
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT || 3306),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    logging: process.env.DB_LOGGING,
}));
