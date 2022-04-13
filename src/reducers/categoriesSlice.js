import { createSlice } from '@reduxjs/toolkit'
const initialState = {
		categories: [],
		reserv: [],
}

const categoriesSlice = createSlice({
		name: 'categories',
		initialState,
		reducers: {
				save: (state, action) => {
						state.categories = action.payload;
						state.reserv = action.payload
				},
				setCartMark: (state, action) => {
						const { categoryId, id, quantity, switchCategory } = action.payload;
						const category = state.categories.find(el => el.id === categoryId);
						const product = category.productsArr.find(el => el.id === id)
						product.cartProduct = true
						if (switchCategory) {
								product.quantity = quantity
						} else {
								product.quantity = quantity ? quantity + 1 : 1;
						}
				},
				removeCartMark: (state, action) => {
						const { categoryId, id, clear } = action.payload;
						const category = state.categories.find(el => el.id === categoryId);
						const product = category.productsArr.find(el => el.id === id)
						if (clear) {
								product.cartProduct = false;
								product.quantity = 0;
						} else {
								if (product.quantity <= 1) {
										product.cartProduct = false
								}
								product.quantity--
						}
				},
				filterProducts: (state, action) => {
						const delivery = action.payload
						if (delivery) {
								state.categories.forEach((category, idx) => {
										category.productsArr = category.productsArr.filter(el => el.delivery)
								})
						} else {
								state.categories = state.reserv
						}
				}
		}
})
export const { save, setCartMark, removeCartMark, filterProducts } = categoriesSlice.actions
export default categoriesSlice;