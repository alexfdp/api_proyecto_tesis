import { config } from "dotenv";
config()

export const PORT = process.env.PORT || 3000

export const DB_HOST = process.env.DB_HOST || '193.203.168.5'
export const DB_USER = process.env.DB_USER || 'u708242902_iceberg_alex'
export const DB_PASSWORD = process.env.DB_PASSWORD || 'GWXsi@Y;Br6'
export const DB_PORT = process.env.DB_PORT || '3306'
export const DB_DATABASE = process.env.DB_DATABASE || 'u708242902_ctrl_employees'

console.log("http://" + DB_HOST + ":" + PORT)

export default {
    SECRET: 'api-empleados'
}