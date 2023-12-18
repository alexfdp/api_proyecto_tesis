import { pool } from '../db.js';

export const consultarAllUsers = async (req, res) => {
    res.header('Access-Control-Allow-Origin', '*');
    try {
        const { id } = req.params;
        const [result] = await pool.query(`SELECT u.iduser, e.idempleado, 
            CONCAT_WS(' ', e.nombre, e.apellido, e.apellido_2) nombre, 
            u.usuario, u.estado, u.fecha_registro 
            FROM usuario AS u 
            INNER JOIN empleado AS e 
            WHERE  u.iduser != ? AND u.iduser != 1 AND e.idempleado = u.empleado_id ORDER BY u.iduser DESC;`, [id]);
        if (result) {
            res.status(200).json(result)
        } else {
            res.status(400).json({
                message: "Algo salió mal al consultar"
            })
        }
    } catch (error) {
        console.log("error: " + error.message)
        res.status(500).json({
            message: "Ha ocurrido un error: " + error.message
        })
    }
}