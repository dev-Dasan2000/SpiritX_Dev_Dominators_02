import express from 'express';
import { GoogleGenerativeAI } from "@google/generative-ai";
import pg from 'pg';
import dotenv from 'dotenv';
import pool from '../db.js';

dotenv.config();
const router = express.Router();

// Gemini AI setup
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Chatbot API Route
router.post('/', async (req, res) => {
  try {
    const { userQuery } = req.body;

    // Fetch relevant data from PostgreSQL
    const dbQuery = "SELECT * FROM (SELECT * FROM players p INNER JOIN matches m ON m.playerid = p.playerid) AS temp_tableWHERE temp_table.column ILIKE $1 LIMIT 5;";
    const dbResult = await pool.query(dbQuery, [`%${userQuery}%`]);

    // Prepare database context for AI
    const context = JSON.stringify(dbResult.rows);

    // Generate AI response using Gemini
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    const response = await model.generateContent(`Database context: ${context}. User question: ${userQuery}`);
    const botReply = response.candidates[0].content.parts[0].text;

    res.json({ reply: botReply });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Something went wrong" });
  }
});

export default router;


