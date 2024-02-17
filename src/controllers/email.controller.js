import { pool } from '../db.js';
import * as cifr from '../models/cifrar.js';
import generator from 'generate-password';
import nodeMailer from 'nodemailer';

export const searchEmail = async (req, res) => {
    res.header('Access-Control-Allow-Origin', '*');
    try {
        const { correo } = req.body;
        const [result] = await pool.query(`SELECT e.idempleado, e.correo, u.usuario 
        FROM empleado AS e 
        INNER JOIN usuario AS u ON u.empleado_id = e.idempleado 
        WHERE e.correo = ? AND u.estado != 0 limit 1;`
            , [correo]);
        if (result.length <= 0) {
            let msg = "Correo que ingresó no se encuentra registrado"
            res.status(400).json({
                message: msg
            })
        } else {
            cambiarEmail(result[0].idempleado, result[0].usuario, correo, res)
        }
    } catch (error) {
        console.log("error: " + error.message)
        res.status(500).json({
            message: "Ha ocurrido un error al consultar correo: " + error.message
        })
    }
}

async function cambiarEmail(idempleado, usuario, correo, res) {
    try {
        var pass = generarPass();
        const cr = await cifr.cifrar(pass);
        const [result] = await pool.query(`UPDATE usuario SET 
            contrasena = ?, estado = 2 
            WHERE empleado_id = ?;`
            , [cr, idempleado]);
        if (result.affectedRows <= 0) {
            console.log('No se pudo actualizar')
            res.status(400).json({
                message: 'No se pudo actualizar'
            })
        } else {
            var val = sendEmail(correo, usuario, pass)
            console.log('Actualizado con éxito')
            res.status(200).json({
                resulttMail: val,
                message: 'Actualizado con éxito'
            })
        }
    } catch (error) {
        console.log("error: " + error.message)
        res.status(500).json({
            message: "Ha ocurrido un error: " + error.message
        })
    }
}

function sendEmail(correo, usuario, contrasena) {
    let config = nodeMailer.createTransport({
        host: 'smtp.hostinger.com',
        port: 465,
        auth: {
            user: 'soporte@controliceberg.es',
            pass: 'RO1jUx_7Ec6rhnXA'
        }
    })
    const option = {
        from: 'soporte@controliceberg.es',
        subject: 'Pedido de contraseña',
        to: correo,
        html: 'Su usuario es: <b>' + usuario + '</b><br>Su contraseña temporal es: <b>' + contrasena + '</b>'
    };
    config.sendMail(option, function (error, result) {
        if (error) return false;
        return true;
    })
}

function generarPass() {
    var password = generator.generate({
        length: 10,
        numbers: true,
        uppercase: true,
        symbols: '_.'
    });
    return password
}
