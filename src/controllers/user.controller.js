import { pool } from '../db.js';
import { Userperson } from '../models/Userperson.js'

export const consultarDataUser = async (req, res) => {
    res.header('Access-Control-Allow-Origin', '*');
    try {
        const { id } = req.params;
        const [result] = await pool.query('SELECT p.nombre, p.apellido, p.apellido_2, r.descripcion AS rol FROM usuario INNER JOIN persona AS p ON persona_id = idpersona INNER JOIN rol AS r on rol_id = idrol WHERE iduser = ?;'
            , [id]);
        if (result.length <= 0) {
            res.status(400).json({
                message: "El usuario que se desea consultar, no existe"
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