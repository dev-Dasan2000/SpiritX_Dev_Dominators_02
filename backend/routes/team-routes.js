import express from 'express';
import pool from '../db.js';
import { authenticateToken } from '../middleware/authentication.js';

const router = express.Router();

// Get all teams
router.get('/', authenticateToken, async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM teams');
        return res.json(result.rows);
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
});

// Get specific team
router.get('/:teamname', authenticateToken, async (req, res) => {
    try {
        const { teamname } = req.params;
        const { username } = req.body.username;
        const result = await pool.query('SELECT * FROM teams WHERE teamname = $1 && owner = $2', [teamname, username]);
        if (result.rows.length === 0) return res.status(404).json({ error: 'team not found' });
        return res.json(result.rows[0]);
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
});

// Create new team
router.post('/', async (req, res) => {
    try {
        const { teamname, username, mem1, mem2, mem3, mem4, mem5, mem6, mem7, mem8, mem9, mem10, mem11 } = req.body;
        await pool.query(
            'INSERT INTO teams (teamname, owner, mem1, mem2, mem3, mem4, mem5, mem6, mem7, mem8, mem9, mem10, mem11) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)',
            [teamname, username, mem1, mem2, mem3, mem4, mem5, mem6, mem7, mem8, mem9, mem10, mem11]
        );
        return res.status(201).json({ message: 'team created successfully' });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
});

// Update team
router.put('/', authenticateToken, async (req, res) => {
    try {
        const { teamname, username, newteamname, mem1, mem2, mem3, mem4, mem5, mem6, mem7, mem8, mem9, mem10, mem11 } = req.body;
        await pool.query(
            'UPDATE teams SET teamname = $3, mem1 = $4, mem2 = $5, mem3 = $6, mem4 = $7, mem5 = $8, mem6 = $9, mem7 = $10, mem8 = $11, mem9 = $12, mem10 = $13, mem11 = $14 WHERE teamname = $1 && owner = $2',
            [teamname, username, newteamname, mem1, mem2, mem3, mem4, mem5, mem6, mem7, mem8, mem9, mem10, mem11]
        );
        res.json({ message: 'team updated successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Delete team
router.delete('/:teamname', authenticateToken, async (req, res) => {
    try {
        const { teamname } = req.params;
        const { username } = req.body.username;
        await pool.query('DELETE FROM teams WHERE teamname = $1 && owner = $2', [teamname, username]);
        res.json({ message: 'team deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

export default router;