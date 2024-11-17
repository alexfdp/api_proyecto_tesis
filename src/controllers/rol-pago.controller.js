import { pool } from '../db.js';

export const generarRolesPago = async (req, res) => {
    res.header('Access-Control-Allow-Origin', '*');
    try {
        const [result] = await pool.query(`CALL generar_roles_pago;`);
        if (result.length <= 0) {
            res.status(400).json({
                message: "No hubo resultados para la consulta"
            })
        } else {
            if (result[0][0].codigo == 1) {
                res.status(200).json(result[0][0]);
            } else {
                res.status(400).json({ message: "Ocurrió un error durante la ejecución del SP" })
            }
        }
    } catch (error) {
        console.log("error: " + error.message)
        res.status(500).json({
            message: "Ha ocurrido un error al consultar horario de empleado: " + error.message
        })
    }
}

export const consultarRolPago = async (req, res) => {
    res.header('Access-Control-Allow-Origin', '*');
    try {
        const [result] = await pool.query(`CALL generar_roles_pago;`);
        if (result.length <= 0) {
            res.status(400).json({
                message: "No hubo resultados para la consulta"
            })
        } else {
            if (result[0][0].codigo == 1) {
                res.status(200).json(result[0][0]);
            } else {
                res.status(400).json({ message: "Ocurrió un error durante la ejecución del SP" })
            }
        }
    } catch (error) {
        console.log("error: " + error.message)
        res.status(500).json({
            message: "Ha ocurrido un error al consultar horario de empleado: " + error.message
        })
    }
}