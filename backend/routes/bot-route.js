import express from 'express';
import { GoogleGenerativeAI } from "@google/generative-ai";
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
      const dbQuery = `
        SELECT * FROM 
        (SELECT * FROM players p INNER JOIN matches m ON m.playerid = p.playerid) AS temp_table 
        WHERE temp_table.playername ILIKE $1 
        LIMIT 5;
      `;
  
      const dbResult = await pool.query(dbQuery, [`%${userQuery}%`]);
  
      // Structure the data meaningfully
      const structuredContext = dbResult.rows.length > 0
        ? dbResult.rows.map(row => `Player: ${row.playername}, Match ID: ${row.matchid}, Score: ${row.score}`).join("\n")
        : "No relevant data found in the database.";
  
      // Assign a persona and improve the prompt
      const prompt = `
      You are "StatBot", an AI assistant for analyzing player match statistics. 
      You have access to a database of players and their match records. 
  
      Database Records:
      ${structuredContext}
  
      User Query: ${userQuery}
  
      Based on this, answer the user's question.
      If no relevant data is found, politely say so instead of asking for more details.
      `;
  
      // Generate AI response using Gemini
      const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
      const response = await model.generateContent(prompt);
      const botReply = response.response.text(); // Correct extraction
  
      res.json({ reply: botReply });
  
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ error: "Something went wrong" });
    }
  });
  
  

export default router;



