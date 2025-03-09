import express from 'express';
import pool from '../db.js';
import { authenticateToken } from '../middleware/authentication.js';

const router = express.Router();

// Get all players
router.get('/', authenticateToken, async (req, res) => {
    try {
        const result = await pool.query(`SELECT 
                                            p.playerid AS id,
                                            p.playername AS name,
                                            p.university,
                                            p.price,
                                            p.special AS type,
                                            SUM(m.totalruns) AS runs,
                                            ROUND(SUM(m.totalruns) / COUNT(m.matchid), 2) AS average,
                                            ROUND(SUM(m.totalruns) / SUM(m.balls_faced) * 100, 2) AS strikeRate,
                                            COUNT(m.matchid) AS matches
                                        FROM 
                                            players p
                                        JOIN 
                                            matches m ON p.playerid = m.playerid
                                        GROUP BY 
                                            p.playerid, p.playername, p.university, p.price, p.special;
                                        `);
        return res.json(result.rows);
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
});

export default router;