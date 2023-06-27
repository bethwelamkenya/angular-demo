import express, {Request, Response} from 'express';
import mysql from 'mysql';

const app = express();
const port = 3000;

const connection = mysql.createConnection({
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: '9852',
  database: 'ecommerce'
});

connection.connect((error) => {
  if (error) {
    console.error('Error connecting to the database:', error);
  } else {
    console.log('Connected to the database');
  }
});
// Fetch users
app.get('/api/users', (req: Request, res: Response) => {
  const query = 'SELECT * FROM users';

  connection.query(query, (error, results) => {
    if (error) {
      console.error('Error fetching users:', error);
      res.status(500).json({error: 'Internal server error'});
    } else {
      res.json(results);
    }
  });
});
// Fetch users
app.get('/api/users/:username', (req: Request, res: Response) => {
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
      res.json(results[0]);
    }
  });
});

// Create user
app.post('/api/users', (req: Request, res: Response) => {
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

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

export class Server {
}
