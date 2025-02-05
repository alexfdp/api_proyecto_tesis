import { pool } from '../db.js';
import * as cifr from '../models/cifrar.js';

export const consultAllEmployees = async (req, res) => {
    res.header('Access-Control-Allow-Origin', '*');
    try {
        const { id } = req.params;
        const [result] = await pool.query(`SELECT p.idempleado, p.nombre, p.apellido, p.apellido_2, p.estado, usr.estado AS estadou, p.cedula, p.direccion, p.telefono, p.correo, 
                p.sueldo, p.fecha_nacimiento, c.descripcion AS cargo, p.fecha_contratacion, p.fecha_registro, usr.usuario , d.nombre_departamento
                FROM usuario AS usr 
                INNER JOIN empleado AS p ON empleado_id = idempleado 
                INNER JOIN cargo AS c ON p.cargo_id = c.idcargo 
                INNER JOIN departamento d ON d.iddepartamento = c.departamento_id
                WHERE iduser != ?
                ORDER BY p.idempleado DESC;`
            , [id]);
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
            message: "Ha ocurrido un error al consultar empleados: " + error.message
        })
    }
}

export const leerUser = async (req, res) => {
    res.header('Access-Control-Allow-Origin', '*');
    try {
        const { usuario } = req.body;
        const [result] = await pool.query(`SELECT usuario FROM usuario WHERE usuario = ?;`
            , [usuario]);
        if (result.length <= 0) {
            res.status(200).json({
                message: 'Usuario no existe'
            })
        } else {
            res.status(404).json({
                message: 'Usuario existe'
            })
        }
    } catch (error) {
        console.log("error insert employee: " + error.message);
        res.status(500).json({
            message: "Ha ocurrido un error al crear empelado: " + error.message
        })
    }
}

export const actualizarEmpleado = async (req, res) => {
    res.header('Access-Control-Allow-Origin', '*');
    try {
        const { direccion, telefono, correo, cargo_id, sueldo, idempleado } = req.body;
        const [result] = await pool.query(`UPDATE empleado AS e INNER JOIN usuario AS u SET 
            e.direccion = ?, e.telefono = ?, e.correo = ?, e.cargo_id = ?, e.sueldo = ? 
            WHERE e.idempleado = ? AND e.idempleado = u.empleado_id;`
            , [direccion, telefono, correo, cargo_id, sueldo, idempleado]);
        if (result.affectedRows <= 0) {
            console.log('No se pudo actualizar')
            res.status(400).json({
                message: 'No se pudo actualizar'
            })
        } else {
            console.log('Actualizado con éxito')
            res.status(200).json({
                message: 'Actualizado con éxito'
            })
        }
    } catch (error) {
        console.log("error update employee: " + error.message);
        res.status(500).json({
            message: "Ha ocurrido un error al actualizar empelado: " + error.message
        })
    }
}

export const updateEstado = async (req, res) => {
    res.header('Access-Control-Allow-Origin', '*');
    try {
        let result;
        const { estado, idempleado, contrasena } = req.body;
        const cr = await cifr.cifrar(contrasena);
        if (estado === 1) {
            [result] = await pool.query(`UPDATE empleado AS e INNER JOIN usuario AS u 
                SET e.estado = 0, u.estado = 0, u.contrasena = NULL WHERE e.idempleado = ? AND e.idempleado = u.empleado_id;`
                , [idempleado]);
        } else {
            [result] = await pool.query(`UPDATE empleado AS e INNER JOIN usuario AS u 
                SET e.estado = 1, u.estado = 2, u.contrasena = ? WHERE e.idempleado = ? AND e.idempleado = u.empleado_id;`
                , [cr, idempleado]);
        }
        if (result.affectedRows <= 0) {
            console.log('No se pudo actualizar el estado')
            res.status(400).json({
                message: 'No se pudo actualizar'
            })
        } else {
            console.log('Actualizado con éxito')
            res.status(200).json({
                message: 'Estado actualizado con éxito'
            })
        }
    } catch (error) {
        console.log("error update employee: " + error.message);
        res.status(500).json({
            message: "Ha ocurrido un error al actualizar estado empelado: " + error.message
        })
    }
}

export const agregarEmpleado = async (req, res) => {
    res.header('Access-Control-Allow-Origin', '*');
    try {
        const { nombre, apellido, apellido_2, cedula, direccion, telefono, correo, sueldo, rol_id, cargo_id, fecha_nacimiento, fecha_contratacion, usuario } = req.body;
        //console.log(req.body)
        let result;
        if (fecha_contratacion == null) {
            [result] = await pool.query(`INSERT INTO empleado 
            (cargo_id, nombre, apellido, apellido_2, fecha_nacimiento, cedula, direccion, telefono, correo, sueldo) 
            VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?);`
                , [cargo_id, nombre, apellido, apellido_2, fecha_nacimiento, cedula, direccion, telefono, correo, sueldo]);
        } else {
            [result] = await pool.query(`INSERT INTO empleado 
            (cargo_id, nombre, apellido, apellido_2, fecha_nacimiento, cedula, direccion, telefono, correo, fecha_contratacion, sueldo) 
            VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);`
                , [cargo_id, nombre, apellido, apellido_2, fecha_nacimiento, cedula, direccion, telefono, correo, fecha_contratacion, sueldo]);
        }
        const ide = result.insertId;
        ingresarUser(ide, rol_id, usuario, res);
    } catch (error) {
        console.log("error insert employee: " + error.message);
        res.status(500).json({
            message: "Ha ocurrido un error al crear empelado: " + error.message
        })
    }
}

async function ingresarUser(empleado_id, rol_id, usuario, res) {
    try {
        const [result] = await pool.query('INSERT INTO usuario (rol_id, empleado_id, usuario) VALUES(?, ?, ?);'
            , [rol_id, empleado_id, usuario]);
        if (result.insertId != 0) {
            // res.send("Guardado correctamente.")
            res.status(200).json({
                message: "Guardado exitosamente."
            })
        }
    } catch (error) {
        console.log("error insert user: " + error.message)
        res.status(500).json({
            message: "Ha ocurrido al crear usuario: " + error.message
        })
    }
}

export const consultOnlyEmployees = async (req, res) => {
    res.header('Access-Control-Allow-Origin', '*');
    try {
        const { id } = req.params;
        const [result] = await pool.query(`SELECT e.idempleado, 
            CONCAT_WS(' ', e.nombre, e.apellido, e.apellido_2) nombre 
            FROM empleado AS e 
            INNER JOIN usuario AS u 
            WHERE u.empleado_id = e.idempleado AND 
            u.iduser != ? 
            AND u.iduser != 1 
            ORDER BY nombre ASC;`
            , [id]);
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
            message: "Ha ocurrido un error al consultar empleados: " + error.message
        })
    }
}