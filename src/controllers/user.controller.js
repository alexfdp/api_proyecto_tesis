import { pool } from '../db.js';
import { Userperson } from '../models/Userperson.js'

export const consultarDataUser = async (req, res) => {
    res.header('Access-Control-Allow-Origin', '*');
    try {
        const { id } = req.params;
        const [result] = await pool.query(`SELECT p.nombre, p.apellido, p.apellido_2, r.descripcion AS rol 
            FROM usuario AS u 
            INNER JOIN empleado AS p ON u.empleado_id = p.idempleado 
            INNER JOIN rol AS r on u.rol_id = r.idrol 
            WHERE iduser = ? AND u.estado != 0  AND u.estado != 2;`
            , [id]);
        if (result.length <= 0) {
            res.status(400).json({
                message: "El usuario que se desea consultar, no existe o no se encuentra activo"
            })
        } else {
            var usu = new Userperson();
            usu = result[0];
            res.json(usu);
        }
    } catch (error) {
        console.log("error: " + error.message)
        res.status(500).json({
            message: "Ha ocurrido un error: " + error.message
        })
    }
}