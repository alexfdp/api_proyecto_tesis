import jwt from 'jsonwebtoken';
import config from '../config.js';

export const validarOPR = async (req, res) => {
    //res.header('Access-Control-Allow-Origin', '*');
    try {
        const { codigoSap } = req.body;
        console.log("body: " + req.body);
        console.log("codigoSap: " + codigoSap);
        var resultado = '{"Codigo": "1","Mensaje Error": "Empleado No Existe"}';
        // if (codigoSap == 10243) {
        //     resultado = '{"Codigo": "1","Mensaje Error": "Empleado No Existe"}';
        // }
        if (codigoSap == "55886") {
            resultado = '{"Codigo": "1","Mensaje Error": "Empleado Cesado"}';
        }
        if (codigoSap == "105692") {
            resultado = '{"Codigo": "0 Proceso Exitoso","CodCargo": "450","Cargo": "SUPERVISOR DE SEGURIDAD","CodTienda": "W001","Tienda": "Guayaquil_AdePaSA-C.C.CeibosADPS"}';
        }
        //console.log(resultado);
        res.json(JSON.parse(resultado));
    } catch (error) {
        console.log("error: " + error.message)
        res.status(500).json({
            message: "Ha ocurrido un error: " + error.message
        })
    }
}
