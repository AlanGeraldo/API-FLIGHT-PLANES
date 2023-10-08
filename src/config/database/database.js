import { Sequelize } from "sequelize";
import { envs } from '../enviroments/enviroments.js'

const sequelize = new Sequelize(envs.DB_URI, {
    logging: false
})

export async function authenticate() {
    try {
        await sequelize.authenticate()
        console.log('conexion exitosa')
    } catch (error) {
        throw new Error('Error al autenticar')
    }
}

export async function syncUp() {
    try {
        await sequelize.sync()
        console.log('conexion sync exitosa')
    } catch (error) {
        throw new Error('Error al sincronizar')        
    }
}

export default sequelize
