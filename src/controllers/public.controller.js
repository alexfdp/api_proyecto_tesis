import { pool } from '../db.js';

export const consultarCargos = async (req, res) => {
    const [result] = await pool.query('select * from cargo');
    res.json(result);
}

export const consultarRoles = async (req, res) => {
    const [result] = await pool.query('select * from rol');
    res.json(result);
}