import { pool } from '../db.js';

export const consultAllEmployees = async (req, res) => {
    res.header('Access-Control-Allow-Origin', '*');
    try {
        const [result] = await pool.query('SELECT p.nombre, p.apellido, p.apellido_2 FROM usuario INNER JOIN persona AS p ON persona_id = idpersona;'
        );
        if (result.length <= 0) {
            res.status(400).json({
                message: "No se realizó la consulta"
            })
        } else {
            res.json(result);
        }
    } catch (error) {
        console.log("error: " + error.message)
        res.status(500).json({
            message: "Ha ocurrido un error: " + error.message
        })
    }
}