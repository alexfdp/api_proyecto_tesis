import { pool } from '../db.js';
import * as cifr from '../models/cifrar.js';

export const consultAllEmployees = async (req, res) => {
    res.header('Access-Control-Allow-Origin', '*');
    try {
        const { id } = req.params;
        const [result] = await pool.query('SELECT p.nombre, p.apellido, p.apellido_2, ' +
            'p.estado, pt.descripcion AS puesto, p.fecha_registro FROM usuario ' +
            'INNER JOIN empleado AS p ON empleado_id = idempleado ' +
            'INNER JOIN puesto AS pt ON p.puesto_id = pt.idpuesto WHERE iduser != ?;'
            , [id]);
        if (result.length <= 0) {
            res.status(400).json({
                message: "No hubo resultados para la consulta"
            })
        } else {
            res.json(result);
        }
    } catch (error) {
        console.log("error: " + error.message)
        res.status(500).json({
            message: "Ha ocurrido un error al consultar empleados: " + error.message
        })
    }
}

export const agregarEmpleado = async (req, res) => {
    res.header('Access-Control-Allow-Origin', '*');
    try {
        const { nombre, apellido, apellido_2, cedula, direccion, telefono, correo, sueldo, rol_id, puesto_id, usuario, contrasena } = req.body;
        const [result] = await pool.query(`INSERT INTO persona 
            (nombre, apellido, apellido_2, cedula, direccion, telefono, correo, sueldo) 
            VALUES(?, ?, ?, ?, ?, ?, ?, ?);`
            , [nombre, apellido, apellido_2, cedula, direccion, telefono, correo, sueldo]);
        const cr = await cifr.cifrar(contrasena);
        const ide = result.insertId;

        ingresarUser(ide, rol_id, puesto_id, usuario, cr, res);
    } catch (error) {
        console.log("error: " + error.message)
        res.status(500).json({
            message: "Ha ocurrido un error al crear empelado: " + error.message
        })
    }
}

async function ingresarUser(persona_id, rol_id, puesto_id, usuario, contrasena, res) {
    try {
        const [result] = await pool.query('INSERT INTO usuario (rol_id, puesto_id, persona_id, usuario, contrasena) VALUES(?, ?, ?, ?, ?);'
            , [rol_id, puesto_id, persona_id, usuario, contrasena]);
        if (result.insertId != 0) {
            res.send("guardado correctamente")
        }
    } catch (error) {
        console.log("error: " + error.message)
        res.status(500).json({
            message: "Ha ocurrido al crear usuario: " + error.message
        })
    }
}