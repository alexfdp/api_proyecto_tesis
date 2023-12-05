import { pool } from '../db.js';

export const consultarPuestos = async (req, res) => {
    const [result] = await pool.query('select * from puesto');
    res.json(result);
}