import { pool } from '../db.js';

export const generarRolesPago = async (req, res) => {
    res.header('Access-Control-Allow-Origin', '*');
    try {
        const [result] = await pool.query(`CALL generar_roles_pago;`);
        if (result.length <= 0) {
            res.status(400).json({
                message: "Error al generar roles de pago"
            })
        } else {
            if (result[0][0].codigo == 1) {
                res.status(200).json(result[0][0]);
            } else {
                res.status(400).json(result)
            }
        }
    } catch (error) {
        console.log("error: " + error.message)
        res.status(500).json({
            message: "Ha ocurrido un error al consultar horario de empleado: " + error.message
        })
    }
}

export const consultarRolesPago = async (req, res) => {
    res.header('Access-Control-Allow-Origin', '*');
    try {
        const { mes, anio } = req.body;
        const [result] = await pool.query(`SELECT n.empleado_id, CONCAT_WS(' ', e.nombre, e.apellido, e.apellido_2) nombre, c.descripcion AS nombre_cargo, 
		        d.nombre_departamento
            FROM nomina n
            INNER JOIN empleado E ON E.idempleado = N.empleado_id
            INNER JOIN cargo c ON c.idcargo = e.cargo_id
            INNER JOIN departamento d ON d.iddepartamento = c.departamento_id
            WHERE MONTH(fecha_corte) = ? AND YEAR(fecha_corte) = ?;`, [mes, anio]);
        if (result.length <= 0) {
            res.status(400).json({
                message: "No hubo resultados para la consulta"
            })
        } else {
            res.status(200).json(result);
        }
    } catch (error) {
        console.log("error: " + error.message)
        res.status(500).json({
            message: "Ha ocurrido un error al consultar horario de empleado: " + error.message
        })
    }
}

export const consultarRolEmpleado = async (req, res) => {
    res.header('Access-Control-Allow-Origin', '*');
    try {
        const { idempleado, mes, anio } = req.body;
        const [result] = await pool.query(`CALL consultarrolpago(?, ?, ?);`, [idempleado, mes, anio]);
        if (result.length <= 0) {
            res.status(400).json({
                message: "No hubo resultados para la consulta"
            })
        } else {
            res.status(200).json({ empleado: result[0][0], deduccionesGenerales: result[1], deduccionesEmpleado: result[2], bonificacionesEmpleado: result[3] });
        }
    } catch (error) {
        console.log("error: " + error.message)
        res.status(500).json({
            message: "Ha ocurrido un error al consultar horario de empleado: " + error.message
        })
    }
}