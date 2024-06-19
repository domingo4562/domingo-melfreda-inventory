import express from 'express';
import cors from 'cors';

import { checkConnection } from './db_config.js';

const app = express();
const port = 3000;

const connection = checkConnection();
app.use(cors({credentials: true,origin: ["http://localhost:5173"] }));
app.use(express.json());

app.post('/login', async (req, res) => {
    const { username, password } = req.body;
    const query = 'SELECT * FROM users WHERE username=? AND password=? LIMIT 1';
    connection.query(query, [username, password], (error, results, fields) => {
        if (error) {
            console.error('Error executing query:', error);
            res.status(500).json({ error: 'Internal server error' });
            return;
        }
        if (results.length > 0) {
            res.json(true)

        } else {
            res.json(false);
        }

    });
    
});

app.post('/login', (req, res) => {
    const { username, password } = req.body;
    const query = 'SELECT * FROM users WHERE username=? AND password=? LIMIT 1';
    connection.query(query, [username, password], (error, results, fields) => {
        if (error) {
            console.error('Error executing query:', error);
            res.status(500).json({ error: 'Internal server error' });
            return;
        }
        if (results.length > 0) {
            res.json(true)

        } else {
            res.json(false);
        }

    });
});

app.get('/users/get-all', async (req, res) => {
    const query = 'SELECT * FROM users';

    connection.query(query, (error, results, fields)=>{
        if (error) {
            console.error('Error executing query:', error);
            res.status(500).json({ error: 'Internal server error' });
            return;
        }

        res.json(results);

    });
});

app.post('/api/products', (req, res) => {
    const { product_id, product_name, quantity, unit, price } = req.body;
    const query = `INSERT INTO products (product_id, product_name, quantity, unit, price) VALUES (?, ?, ?, ?, ?)`;
    db.query(query, [product_id, product_name, quantity, unit, price], (err, results) => {
      if (err) {
        console.error(err);
        res.status(500).send({ message: 'Error inserting product' });
      } else {
        res.send({ message: 'Product inserted successfully' });
      }
    });
  });

app.post('/products/update-by-id', async (req, res) => {
    const { product_id, product_name, quantity, unit, price } = req.body;

    const query = 'UPDATE products SET product_name = ?, quantity = ?, unit = ?, price = ? WHERE product_id = ?';

    connection.query(query, [product_name, quantity, unit, price, product_id], (error, results) => {
        if (error) {
            console.error('Error executing query:', error);
            res.status(500).json({ error: 'Internal server error' });
            return;
        }

        if (results.affectedRows > 0) {
            res.json({ message: 'true' });
        } else {
            res.status(404).json({ error: 'false' });
        }
    });
});

app.post('/products/add-product', async (req, res) => {
    const { product_id, product_name, quantity, unit, price } = req.body;
    
    const query = 'INSERT INTO products (product_id, product_name, quantity, unit, price) VALUES (?,?,?,?,?)';

    connection.query(query, [product_id, product_name, quantity, unit, price, ], (error, results) => {
        if (error) {
            console.error('Error executing query:', error);
            res.status(500).json({ error: 'Internal server error' });
            return;
        }

        if (results.affectedRows > 0) {
            res.json({ exist: false, success: true  });
        } else {
            res.status(404).json({ exist: false, success: false });
        }
    });
});

app.post('/products/delete-by-id', async (req, res) => {
    const {product_id} = req.body;

    const query = 'DELETE from products WHERE product_id = ?';

    connection.query(query, [product_id], (error, results) => {
        if (error) {
            console.error('Error executing query:', error);
            res.status(500).json({ error: 'Internal server error' });
            return;
        }

        if (results.affectedRows > 0) {
            res.json({ message: 'Product delete successfully' });
        } else {
            res.status(404).json({ error: 'false' });
        }
    });
});

  app.post('/products/get-by-id', async (req, res) => {
    const { product_id } = req.body;
    const query = 'SELECT * FROM products WHERE product_id=? LIMIT 1';
    connection.query(query, [product_id], (error, results, fields) => {
      if (error) {
        console.error('Error executing query:', error);
        res.status(500).json({ error: 'Internal server error' });
        return;
      }
      if (results.length > 0) {
        res.json(results[0]);
      } else {
        res.json({ error: 'Product not found' });
      }
    });
  });

  app.get('/products/get-all', async (req, res) => {
    const query = 'SELECT * FROM products';

    connection.query(query, (error, results, fields)=>{
        if (error) {
            console.error('Error executing query:', error);
            res.status(500).json({ error: 'Internal server error' });
            return;
        }

        res.json(results);

    });
});



app.get('/', (req, res) => {
    res.send('Hello from your express app!');
});

app.listen(port, () => {
    console.log('Server is listening on port ${PORT}');
});



app.get('/products/get-info/:product_id', (req, res) => {
    const productId = req.params.product_id;
    res.send(`This is a sample info route for: ${productId}`);
});

app.get('/products/get-all', (req, res) => {


    res.send('This is a sample product route');
});

app.get('/reports/get-monthly', (req, res) => {


    res.send('This is a monthly route');
});

app.get('/reports/get-yearly', (req, res) => {


    res.send('This is a sample yearly route');
});



