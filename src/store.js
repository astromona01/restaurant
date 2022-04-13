import { configureStore } from '@reduxjs/toolkit'
import categoriesSlice from './reducers/categoriesSlice';
import ordersSlice from "./reducers/ordersSlice";
import addressSlice from "./reducers/addressSlice";

export const store =  configureStore({
		reducer: {
				categories: categoriesSlice.reducer,
				orders: ordersSlice.reducer,
				address: addressSlice.reducer
		}
})