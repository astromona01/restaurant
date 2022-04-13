import { createSlice } from '@reduxjs/toolkit';
const initialState = {
		street: '',
		house: '',
		invalid: {
				street: false,
				house: false
		},
		getType: {
				delivery: false,
				pickup: true
		}
}

const addressSlice = createSlice({
		name: 'address',
		initialState,
		reducers: {
				saveAddress: (state, action) => {
						const input = Object.keys(action.payload)[0]
						const value = action.payload[input]
						if (input === 'street') {
								state.street = value
						}else {
								state.house = value
						}
				},
				setInvalidStatus: (state, action) => {
						const input = Object.keys(action.payload)[0]
						const status = action.payload[input]
						if (input === 'street') {
								state.invalid.street = status
						} else {
								state.invalid.house = status
						}
				},
				setGetType: (state,action) => {
						state.getType = action.payload
				}
		}
})
export const { saveAddress, setInvalidStatus, setGetType } = addressSlice.actions
export default addressSlice;