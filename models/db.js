const { pool } = require('../models/dbconnection');

const dotenv = require('dotenv');
const { request } = require('express');

dotenv.config();

/**
 * Create Users Table if not in db.
 */

async function createUserTable() {
	const queryText = `CREATE TABLE IF NOT EXISTS
   users(
    ID SERIAL PRIMARY KEY,
    name VARCHAR(30),
    email VARCHAR(30)
   )`;

	const client = await pool.connect().catch((err) => {
		console.log(err);
	});

	client
		.query(queryText)
		.then((res) => {
			console.log('User Table created');
		})
		.catch((err) => {
			console.log('This' + err);
		});
	client.release();
}

/*
insert into user details into tabel
*/

const insertUser = (request, response) => {
	const { name, email } = request.body;

	pool.query("insert into users (name,email) values ('" + name + "','" + email + "')", (err, result) => {
		if (err) throw err;
		response.json({ status: true, count: result.rowCount });
	});
};
/*
Get the all the users details
*/
const getUsers = (request, response) => {
	pool.query('SELECT * FROM users ORDER BY id ASC', (error, results) => {
		if (error) {
			throw error;
		}
		response.status(200).json(results.rows);
	});
};

/*
Get the user details by id
  */

const getUserById = (request, response) => {
	const id = parseInt(request.params.id);

	pool.query('SELECT * FROM users WHERE id = $1', [ id ], (error, results) => {
		if (error) {
			throw error;
		}
		response.status(200).json(results.rows);
	});
};

const updateUser = (request, response) => {
	const id = parseInt(request.params.id);
	let name = request.body.name;
	let email = request.body.email;

	pool.query('UPDATE users SET name = $1, email = $2 WHERE id = $3', [ name, email, id ], (error, result) => {
		if (error) {
			throw error;
		}
		response.status(200).send(`user modified with ID: ${id}`);
	});
};

module.exports = {
	createUserTable,
	insertUser,
	getUsers,
	getUserById,
	updateUser
};
