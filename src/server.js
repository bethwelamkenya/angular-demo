const express = require('express');
const cors = require('cors');
const multer = require('multer');
const port = 3000;
const mysql = require('mysql2');
const {readFileSync, readFile} = require("fs");
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

// Configure multer to handle file uploads
const upload = multer({dest: 'uploads/'});

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
      res.json(results[0]);
    }
  });
});

// Create user
app.post('/api/users', (req, res) => {
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

let name  = "kar"
function me() {
  return `hello ${name}`
}

// Fetch admins
app.get('/api/admins', async (req, res) => {
  const query = 'SELECT * FROM admins';
  connection.query(query, (error, results) => {
    if (error) {
      console.error('Error fetching admins:', error);
      res.status(500).json({error: 'Internal server error'});
    } else {
      res.json(results);
    }
  });
});

// Fetch admin
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
      res.json(results[0]);
    }
  });
});

// Create admin
app.post('/api/admins', (req, res) => {
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


// Fetch cart
app.get('/api/cart', async (req, res) => {
  const query = 'SELECT * FROM cart';
  connection.query(query, (error, results) => {
    if (error) {
      console.error('Error fetching cart:', error);
      res.status(500).json({error: 'Internal server error'});
    } else {
      res.json(results);
    }
  });
});

// Fetch admin
app.get('/api/cart/:userId', (req, res) => {
  const {userId} = req.params;
  const query = 'SELECT * FROM cart where userid=?';
  connection.query(query, [userId], (error, results) => {
    if (error) {
      console.error('Error fetching carts:', error);
      res.status(500).json({error: 'Internal server error'});
    } else if (results.length === 0) {
      let data = [];
      res.json(data)
      // res.status(404).json({error: 'Cart not found'});
    } else {
      res.json(results);
    }
  });
});

// Fetch admin
app.get('/api/cart/specific/:cartId', (req, res) => {
  const {cartId} = req.params;
  const query = 'SELECT * FROM cart where cartid=?';

  connection.query(query, [cartId], (error, results) => {
    if (error) {
      console.error('Error fetching carts:', error);
      res.status(500).json({error: 'Internal server error'});
    } else if (results.length === 0) {
      res.status(404).json({error: 'Cart not found'});
    } else {
      res.json(results[0]);
    }
  });
});


// Create cart
app.post('/api/cart', (req, res) => {
  const {userId, id, quantity} = req.body;
  const query = 'INSERT INTO cart (userid, id, quantity) VALUES (?, ?, ?)';

  connection.query(query, [userId, id, quantity], (error, results) => {
    if (error) {
      console.error('Error creating cart:', error);
      res.status(500).json({error: 'Internal server error'});
    } else {
      res.json({message: 'Cart created successfully'});
    }
  });
});

// Update cart
app.post('/api/cartUpdate', (req, res) => {
  const {userId, id, quantity} = req.body;
  const query = 'UPDATE cart SET quantity=? WHERE userid=? AND id=?'

  connection.query(query, [quantity, userId, id], (error, results) => {
    if (error) {
      console.error('Error updating cart:', error);
      res.status(500).json({error: 'Internal server error'});
    } else {
      res.json({message: 'Cart updated successfully'});
    }
  });
});

// Delete cart
app.post('/api/cartDelete', (req, res) => {
  const {userId} = req.body;
  const query = 'DELETE FROM cart WHERE userid=?'

  connection.query(query, [userId], (error, results) => {
    if (error) {
      console.error('Error deleting cart:', error);
      res.status(500).json({error: 'Internal server error'});
    } else {
      res.json({message: 'Cart deleted successfully'});
    }
  });
});

// Fetch products
app.get('/api/products', async (req, res) => {
  const query = 'SELECT * FROM products';
  connection.query(query, (error, results) => {
    if (error) {
      console.error('Error fetching products:', error);
      res.status(500).json({error: 'Internal server error'});
    } else {
      let data = [];
      for (let i = 0; i < results.length; i++) {
        let image = results[i].image;
        const id = results[i].id;
        const name = results[i].name;
        const description = results[i].description;
        const price = results[i].price;
        const stock = results[i].stock;
        let url;
        if (image == null) {
          const filePath = 'assets/images/image_80px.png';
          readFile(filePath, (err, data) => {
            if (err) {
              console.error('Error reading file:', err);
              return;
            }
            let imaging = new Blob([data], {type: 'image/png'});
            url = `data:image/jpeg;base64,${imaging.toString('base64')}`
          });
        } else {
          url = `data:image/jpeg;base64,${image.toString('base64')}`
        }
        const imageData = {
          id: id,
          name: name,
          description: description,
          price: price,
          stock: stock,
          imageURL: url
        };
        data.push(imageData)

      }
      res.json(data);
      // res.json(results);
    }
  });
});

// Fetch products
app.get('/api/products/:id', (req, res) => {
  const {id} = req.params;
  const query = 'SELECT * FROM products where id = ?';

  connection.query(query, [id], (error, results) => {
    if (error) {
      console.error('Error fetching products:', error);
      res.status(500).json({error: 'Internal server error'});
    } else if (results.length === 0) {
      res.status(404).json({error: 'Product not found'});
    } else {
      const image = results[0].image;
      const id = results[0].id;
      const name = results[0].name;
      const description = results[0].description;
      const price = results[0].price;
      const stock = results[0].stock;
      const imageData = {
        id: id,
        name: name,
        description: description,
        price: price,
        stock: stock,
        imageURL: `data:image/jpeg;base64,${image.toString('base64')}`
      };

      res.json(imageData);
    }
  });
});

// Update product
app.post('/api/productsUpdate/stock', (req, res) => {
  const {id, stock} = req.body;
  const query = 'UPDATE products SET stock=? WHERE id=?'

  connection.query(query, [stock, id], (error, results) => {
    if (error) {
      console.error('Error updating product:', error);
      res.status(500).json({error: 'Internal server error'});
    } else {
      res.json({message: 'Product updated successfully'});
    }
  });
});

// Create product
app.post('/api/products', upload.single('image'), (req, res) => {
  // get the sent file
  const imageFile = req.file;
  if (!imageFile) {
    res.status(400).send('No image file received');
    return;
  }
  // Read the image file from the disk
  const image = readFileSync(imageFile.path);
  const {name, description, price, stock} = req.body;
  const query = 'INSERT INTO products (name, description, price, stock, image) VALUES (?, ?, ?, ?, ?)';
  connection.query(query, [name, description, price, stock, image], (error, results) => {
    if (error) {
      console.error('Error creating product:', error);
      res.status(500).json({error: 'Internal server error'});
    } else {
      res.json({message: 'product created successfully'});
    }
  });
});

app.get('/ping', (req, res) => {
  res.send('Server is running');
});

// start the server
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);

  // Ping the server to check if it's running
  const pingEndpoint = `http://localhost:${port}/ping`;
  console.log(`You can ping the server at: ${pingEndpoint}`);
});
