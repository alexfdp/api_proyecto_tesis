import { pool } from '../db.js';
import * as cifr from '../models/cifrar.js';

export const consultarAllUsers = async (req, res) => {
    res.header('Access-Control-Allow-Origin', '*');
    try {
        const { id } = req.params;
        const [result] = await pool.query(`SELECT u.iduser, u.rol_id, e.idempleado, 
        CONCAT_WS(' ', e.nombre, e.apellido, e.apellido_2) nombre, 
        u.usuario, u.estado, u.fecha_registro, r.descripcion AS rol 
        FROM usuario AS u 
        INNER JOIN empleado AS e 
        INNER JOIN rol AS r 
        WHERE  u.iduser != ? AND u.iduser != 1 AND e.idempleado = u.empleado_id 
        AND r.idrol = u.rol_id ORDER BY u.iduser DESC;`, [id]);
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

export const updateUsuario = async (req, res) => {
    res.header('Access-Control-Allow-Origin', '*');
    try {
        const { iduser, usuario, contrasena, rol_id } = req.body;
        const cr = await cifr.cifrar(contrasena);
        const [result] = await pool.query(`UPDATE usuario AS u 
            SET u.usuario = ?, u.contrasena = ?, u.rol_id = ?, u.estado = 2 
            WHERE u.iduser = ? AND u.estado != 0;`,
            [usuario, cr, rol_id, iduser]);

        if (result.affectedRows <= 0) {
            console.log('No se pudo actualizar usuario')
            res.status(400).json({
                message: 'No se pudo actualizar usuario'
            })
        } else {
            console.log('Usuario actualizado con éxito')
            res.status(200).json({
                message: 'Usuario actualizado con éxito'
            })
        }
    } catch (error) {
        console.log("error update user: " + error.message);
        res.status(500).json({
            message: "Ha ocurrido un error al actualizar usuario: " + error.message
        })
    }
}