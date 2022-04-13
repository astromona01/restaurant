const fs = require('fs');
const express = require('express');
const bodyParser = require('body-parser')
const cors = require('cors');
const cart = require('./cart')

const port = process.env.port || 5000;


const app = express()
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors())

const actions = {
		add: cart.add,
}

function convertImages(product) {
		const image = fs.readFileSync(product.img)
		const New = fs.readFileSync(product.new)
		const hit = fs.readFileSync(product.hit)
		for (let i = 0; i < 3; i++) {
				if (i=== 0) {
						const b64 = Buffer.from(image).toString('base64')
						product.img = "data:application/octet-stream;base64," + b64
				} else if (i === 1) {
						const b64 = Buffer.from(New).toString('base64')
						product.new = "data:application/octet-stream;base64," + b64
				} else {
						const b64 = Buffer.from(hit).toString('base64')
						product.hit = "data:application/octet-stream;base64," + b64
				}
		}
		return product;
}

function handler(req, res, action, file) {
		fs.readFile(file, 'utf-8', (err, data) => {
				if (err){
						res.sendStatus(404, JSON.parse({result: 0}))
				}
				const newCart = actions[action](JSON.parse(data), req)
				fs.writeFile(file, newCart, (err) => {
						if (err){
								res.send('{"result": "error"}')
						}
						res.send('{"result": "success"}')
				})
		})
}

app.get('/', (req, res)=> {
		const categories = JSON.parse(fs.readFileSync('./src/server/db/category.json'));
		categories.forEach((category, idx) => {
				category.productsArr = [];
				const products = JSON.parse(fs.readFileSync('./src/server/db/products.json'));
				category.products.forEach(id => {
						const product = products.find(el => el.id === id && el.categoryId === category.id)
						if (product) {
								category.productsArr.push(convertImages(product))
						}
				})
		})
		res.send(categories)
});

app.post('/add-product', (req, res) => {
		handler(req, res, 'add', 'src/server/db/orderProducts.json')
})
app.put('/remove-product/:id', (req, res) => {
		handler(req, res, 'remove', 'src/server/db/orderProducts.json')
})

app.listen(port, () => {
		console.log(`Listening ${port}`)
})