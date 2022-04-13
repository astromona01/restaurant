import { createSlice } from '@reduxjs/toolkit'

const initialState = {
		amount: 0,
		goodsCount: 0,
		products: []
};

const ordersSlice = createSlice({
		name: 'orders',
		initialState,
		reducers: {
				addOrder: (state, action) => {
						const { id, name, price, delivery, categoryId } = action.payload;
						const find = state.products.find(el => el.id === action.payload.id && el.categoryId === categoryId)
						if (find) {
								find.quantity += 1
						} else {
								state.products.push({id, name, price, delivery, categoryId, quantity: 1})
								state.goodsCount += 1;
						}
						state.amount += action.payload.price;
				},
				removeOrder: (state, action) => {
						const find = state.products.find(el => el.id === action.payload)
						if (find.quantity > 1) {
								find.quantity--
						} else {
								const idx = state.products.indexOf(find);
								state.products.splice(idx, 1)
								state.goodsCount--
						}
						state.amount -= find.price
				},
				filterOrders: (state, action) => {
						const delivery = action.payload
						if (delivery){
								state.reserv = state.products.filter(product => !product.delivery)
								state.products = state.products.filter(product => product.delivery)
								state.amount = state.products.reduce((acc, item) => {
										acc += item.price * item.quantity
										return acc
								}, 0)
						} else {
								state.products = [...state.products, ...state.reserv]
								state.amount = state.products.reduce((acc, item) => {
										acc += item.price * item.quantity
										return acc
								}, 0)
						}
						state.goodsCount = state.products.length
				},
				clearCart: (state) => {
						state.amount = 0
						state.goodsCount = 0;
						state.products = [];
						delete state.reserv
				}
		}
})

export const {  addOrder, removeOrder, clearCart, filterOrders } = ordersSlice.actions;
export default ordersSlice;