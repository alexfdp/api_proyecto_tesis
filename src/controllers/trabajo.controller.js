import { pool } from '../db.js';


function convertirFecha(fechaHora) {
    const fecha = new Date(fechaHora); // Ejemplo de campo de fecha recibido
    const horas = fecha.getHours();
    const minutos = fecha.getMinutes();
    return horas + ':' + minutos + ':00'
}

export const consultarHorarioById = async (req, res) => {
    res.header('Access-Control-Allow-Origin', '*');
    try {
        const { idempleado } = req.body;
        const [result] = await pool.query(`SELECT idtrabajo, empleado_id, hora_entrada, hora_salida, total_horas 
                FROM horario_trabajo AS R 
                WHERE R.empleado_id = ?;`
            , [idempleado]);
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
            message: "Ha ocurrido un error al consultar horario de empleado: " + error.message
        })
    }
}

export const updateHorario = async (req, res) => {
    res.header('Access-Control-Allow-Origin', '*');
    try {
        const { emplead, existeE, fecha_1, fecha_2 } = req.body;
        let fecha_ini = convertirFecha(fecha_1)
        let fecha_fin = convertirFecha(fecha_2)
        if (existeE) {
            const [result] = await pool.query(`UPDATE horario_trabajo SET hora_entrada = ?, hora_salida = ? WHERE empleado_id = ?;`
                , [fecha_ini, fecha_fin, emplead]);
            if (result.length <= 0) {
                res.status(400).json({
                    message: "No se pudo actualizar horario de empleado"
                })
            } else {
                res.status(200).json({
                    message: 'Actualizado con éxito'
                })
            }
        } else {
            const [result] = await pool.query(`INSERT INTO horario_trabajo (empleado_id, hora_entrada, hora_salida) VALUES (?, ?, ?);`
                , [emplead, fecha_ini, fecha_fin]);
            if (result.length <= 0) {
                res.status(400).json({
                    message: "No se pudo actualizar horario de empleado"
                })
            } else {
                res.status(200).json({
                    message: 'Actualizado con éxito'
                })
            }
        }
    } catch (error) {
        console.log("error: " + error.message)
        res.status(500).json({
            message: "Ha ocurrido un error al consultar horario de empleado: " + error.message
        })
    }
}


export const consultarHorasTrabajo = async (req, res) => {
    res.header('Access-Control-Allow-Origin', '*');
    try {
        const { fecha } = req.body;
        const { id } = req.params;
        const [result] = await pool.query(`SELECT h.empleado_id, CONCAT_WS(' ', e.nombre, e.apellido, e.apellido_2) nombre,  h.horas_regulares_trabajadas, 
                    h.horas_extras, h.comentario, h.fecha_trabajo
                FROM horas_trabajadas h
                INNER JOIN empleado e ON e.idempleado = h.empleado_id 
                WHERE fecha_trabajo = CAST(? AS DATE) AND e.estado = 1 AND h.empleado_id != 1 AND h.empleado_id != ? AND e.fecha_contratacion <= ?;`
            , [fecha, id, fecha]);
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
            message: "Ha ocurrido un error al consultar horas de trabajo de empleado: " + error.message
        })
    }
}

export const generarRegistros = async (req, res) => {
    res.header('Access-Control-Allow-Origin', '*');
    try {
        const { fecha } = req.body;
        if (fecha) {
            const [result] = await pool.query(`CALL generar_trabajo(?);`, [fecha]);
            if (result.length <= 0) {
                res.status(400).json({ message: "Error al tratar de ejecutar SP" })
            } else {
                if (result[0][0].codigo == 1) {
                    res.status(200).json(result[0][0]);
                } else {
                    res.status(400).json({ message: "Ocurrió un error durante la ejecución del SP" })
                }
            }
        } else {
            res.status(400).json({
                message: "Fecha vacía, envíe datos correctos"
            })
        }
    } catch (error) {
        console.log("error: " + error.message)
        res.status(500).json({
            message: "Ha ocurrido un error al ejecutar SP: " + error.message
        })
    }
}

export const updateHorasTrabajadas = async (req, res) => {
    res.header('Access-Control-Allow-Origin', '*');
    try {
        const { horas_regulares_trabajadas, horas_extras, comentario, empleado_id, fecha_trabajo, fecha } = req.body.horasEmpleado;
        const [result] = await pool.query(`UPDATE horas_trabajadas SET horas_regulares_trabajadas = ?, horas_extras=?, comentario = ? 
                WHERE empleado_id = ? AND fecha_trabajo = CAST(? AS DATE);`,
            [horas_regulares_trabajadas, horas_extras, comentario, empleado_id, fecha]);
        if (result.length <= 0) {
            res.status(400).json({ message: "Error al actualizar datos" })
        } else {
            // if (result.affectedRows = 1) console.log('hola mundo');
            res.status(200).json({ message: "Datos actualizados con éxito" });
        }
    } catch (error) {
        console.log("error: " + error.message)
        res.status(500).json({
            message: "Ha ocurrido un error al actualizar horas: " + error.message
        })
    }
}
