// var mysql = require('mysql');
const express = require('express');
const cors = require('cors');
const {Request, Response} = require("express");
const port = 3000;
const mysql = require('mysql2');

// import express from 'express';
// import mysql from 'mysql';
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Create a MySQL connection pool
// const pool = mysql.createPool({
//   host: 'localhost',
//   user: 'your-username',
//   password: 'your-password',
//   database: 'your-database',
// });
const dbConfig = {
  host: "localhost",
  port: 3306,
  user: "root",
  password: "9852",
  database: "ecommerce"
};

const connection = mysql.createConnection(dbConfig);

connection.connect((error) => {
  if (error) {
    console.error('Error connecting to the database:', error);
  } else {
    console.log('Connected to the database');
  }
});
// Fetch users
app.get('/api/users', async (req, res) => {
  const query = 'SELECT * FROM users';

  // try {
  //   const [rows] = await connection.execute('SELECT * FROM users');
  //   res.json(rows);
  // } catch (error) {
  //   console.error('Error executing query:', error);
  //   res.status(500).json({error: 'Failed to retrieve users'});
  // }
  connection.query(query, (error, results) => {
    if (error) {
      console.error('Error fetching users:', error);
      res.status(500).json({error: 'Internal server error'});
    } else {
      res.json(results);
      // res.send(results)
    }
  });
});
// Fetch users
app.get('/api/users/:username', (req, res) => {
  const {username} = req.params;
  const {password} = req.query;
  const query = 'SELECT * FROM users where username = ? and password = ?';

  connection.query(query, [username, password], (error, results) => {
    if (error) {
      console.error('Error fetching user:', error);
      res.status(500).json({error: 'Internal server error'});
    } else if (results.length === 0) {
      res.status(404).json({error: 'User not found'});
    } else {
      console.log(results[0]);
      res.json(results[0]);
    }
  });
});

// Create user
app.post('/api/users', (req, res) => {
  console.log("called")
  const {name, email, phone, username, password} = req.body;
  const query = 'INSERT INTO users (name, email, phone, username, password) VALUES (?, ?, ?, ?, ?)';

  connection.query(query, [name, email, phone, username, password], (error, results) => {
    if (error) {
      console.error('Error creating user:', error);
      res.status(500).json({error: 'Internal server error'});
    } else {
      res.json({message: 'User created successfully'});
    }
  });
});
// Fetch users
app.get('/api/admins', async (req, res) => {
  const query = 'SELECT * FROM admins';

  // try {
  //   const [rows] = await connection.execute('SELECT * FROM users');
  //   res.json(rows);
  // } catch (error) {
  //   console.error('Error executing query:', error);
  //   res.status(500).json({error: 'Failed to retrieve users'});
  // }
  connection.query(query, (error, results) => {
    if (error) {
      console.error('Error fetching admins:', error);
      res.status(500).json({error: 'Internal server error'});
    } else {
      res.json(results);
      // res.send(results)
    }
  });
});
// Fetch users
app.get('/api/admins/:username', (req, res) => {
  const {username} = req.params;
  const {password} = req.query;
  const query = 'SELECT * FROM admins where username = ? and password = ?';

  connection.query(query, [username, password], (error, results) => {
    if (error) {
      console.error('Error fetching admins:', error);
      res.status(500).json({error: 'Internal server error'});
    } else if (results.length === 0) {
      res.status(404).json({error: 'Admin not found'});
    } else {
      console.log(results[0]);
      res.json(results[0]);
    }
  });
});

// Create user
app.post('/api/admins', (req, res) => {
  console.log("called")
  const {name, email, phone, username, password} = req.body;
  const query = 'INSERT INTO admins (name, email, phone, username, password) VALUES (?, ?, ?, ?, ?)';

  connection.query(query, [name, email, phone, username, password], (error, results) => {
    if (error) {
      console.error('Error creating admin:', error);
      res.status(500).json({error: 'Internal server error'});
    } else {
      res.json({message: 'Admin created successfully'});
    }
  });
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);

  // Ping the server to check if it's running
  const pingEndpoint = `http://localhost:${port}/ping`;
  console.log(`You can ping the server at: ${pingEndpoint}`);
});

app.get('/ping', (req, res) => {
  res.send('Server is running');
});
