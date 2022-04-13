import '../../styles/header.css';
import { filterProducts } from '../../reducers/categoriesSlice'
import { filterOrders } from '../../reducers/ordersSlice'
import { useDispatch } from 'react-redux';
import { saveAddress, setGetType, setInvalidStatus } from '../../reducers/addressSlice';
import { setCartMark } from '../../reducers/categoriesSlice'
import { useEffect } from "react";

const DeliveryBlock = (props) => {
		const { address, orders } = props

		useEffect(() => {
				orders.products.forEach(order => dispatch(setCartMark({...order, switchCategory: true})))
		}, [address.getType])

		const dispatch = useDispatch();

		const filter = (delivery) => {
				dispatch(filterProducts(delivery))
				if(delivery){
						dispatch(setGetType({ delivery: true, pickup: false }))
						dispatch(filterOrders(delivery))
				}else {
						dispatch(setGetType({ delivery: false, pickup: true }))
						dispatch(setInvalidStatus({street: false}))
						dispatch(setInvalidStatus({house: false}))
						dispatch(filterOrders(delivery))
				}
		}
		const handleInput = (e) => {
				const fieldName = e.target.name;
				const value = e.target.value
				dispatch(saveAddress({[fieldName]: value}))
				if (fieldName === 'street') {
						dispatch(setInvalidStatus({street: false}))
				} else {
						dispatch(setInvalidStatus({house: false}))
				}
		}

		return (
				<div className="delivery-block">
						<div className="delivery-left">
								<h1>Доставка г. Москва</h1>
								<div className={address.getType.delivery ? 'visible-address' : 'address-block'}>
										<label htmlFor="street">Улица</label>
										<input onInput={handleInput} name="street" type="text" id="street"/>
										<div className={`${address.invalid.street ? 'visible-tooltip' : ''} tooltip`}>Нужно заполнить для оформления доставки</div>
										<label htmlFor="house">Дом</label>
										<input onInput={handleInput} name="house" type="text" id="house"/>
										<div className={`${address.invalid.house ? 'visible-tooltip' : ''} tooltip`}>Нужно заполнить для оформления доставки</div>
								</div>
						</div>
						<div className="delivery-right">
								<button className={address.getType.delivery ? 'product-get-type' : ''} onClick={() => filter(true)}>Доставка</button>
								<button className={address.getType.pickup ? 'product-get-type' : ''} onClick={() => filter(false)}>Самовывоз</button>
						</div>
				</div>
		)
}
export default DeliveryBlock