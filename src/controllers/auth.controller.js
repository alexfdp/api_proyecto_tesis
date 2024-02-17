import jwt from 'jsonwebtoken';
import { pool } from '../db.js';
import { User } from '../models/User.js';
import * as cifr from '../models/cifrar.js';
import config from '../config.js';

export const autenticar = async (req, res) => {
    res.header('Access-Control-Allow-Origin', '*');
    try {
        const { usuario, contrasena } = req.body;
        const [result] = await pool.query(`SELECT iduser, usuario, contrasena, estado, descripcion as rol 
            FROM usuario 
            INNER JOIN rol ON rol_id = idrol 
            WHERE usuario = ? AND estado != 0;`
            , [usuario]);
        if (result.length <= 0) {
            res.status(400).json({
                message: "Usuario no existe"
            })
        } else {
            var usu = new User();
            usu = result[0];
            const cpr = await cifr.comparar(contrasena, usu.contrasena);
            if (cpr) {
                const token = jwt.sign({ id: usu.iduser, rol: usu.rol }, config.SECRET, {
                    expiresIn: 60//86400 //24 horas
                })
                res.json({
                    estado: usu.estado,
                    token: token
                });
            } else {
                res.status(400).json({
                    message: "Contraseña incorrecta"
                })
            }
        }
    } catch (error) {
        console.log("error: " + error.message)
        res.status(500).json({
            message: "Ha ocurrido un error: " + error.message
        })
    }
}

export const changePass = async (req, res) => {
    res.header('Access-Control-Allow-Origin', '*');
    try {
        const { id } = req.params;
        const { contrasena } = req.body;
        const cr = await cifr.cifrar(contrasena);
        const [result] = await pool.query('UPDATE usuario SET contrasena = ?, estado = 1 WHERE iduser = ? AND ESTADO = 2'
            , [cr, id]);
        if (result.affectedRows <= 0) {
            console.log('No se pudo actualizar contraseña')
            res.status(400).json({
                message: 'No se pudo actualizar contraseña'
            })
        } else {
            console.log('Contraseña actualizada con éxito')
            res.status(200).json({
                message: 'Contraseña actualizada con éxito'
            })
        }
    } catch (error) {
        console.log("Error update password: " + error.message);
        res.status(500).json({
            message: "Ha ocurrido un error al actualizar contraseña: " + error.message
        })
    }
}
