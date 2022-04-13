const add = (cart, req) => {
		cart = req.body
		return JSON.stringify(cart, null, 4)
}

module.exports = {
		add,
}