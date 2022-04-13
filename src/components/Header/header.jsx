import '../../styles/header.css'
import { setInvalidStatus } from '../../reducers/addressSlice';
import { clearCart } from '../../reducers/ordersSlice'
import { removeCartMark } from '../../reducers/categoriesSlice'
import { useDispatch } from 'react-redux'
import menu from '../../assets/BurgerMenu.svg'
import logo from '../../assets/logo.svg'
import cart from '../../assets/Basket.svg'

const Header = (props) => {
		const amount = props.orders.amount
		const { getType } = props.address
		const dispatch = useDispatch();


		const sendCart = async () => {
				const { amount, goodsCount, products } = props.orders
				try {
						const res = await fetch('http://localhost:5000/add-product', {
								method: 'POST',
								headers: {
										"Content-Type": "application/json"
								},
								body: JSON.stringify({amount, goodsCount, products})
						})
						console.log(await res.json())
						dispatch(clearCart())
						removeProductsCartMarks()
				}catch(e) {
						console.log(e)
				}
		}
		const removeProductsCartMarks = () => {
				props.orders.products.forEach(product => {
						dispatch(removeCartMark({...product, clear: true}))
				})
		}
		const handleSendCart = () => {
				if (getType.delivery) {
						const validStreet = /[a-zA-Zа-яА-Я0-9]{1,90}/gi.test(props.address.street)
						const validHouse = /[a-zA-Zа-яА-Я0-9]{1,90}/gi.test(props.address.house)
						!validStreet
								? dispatch(setInvalidStatus({street: true}))
								: dispatch(setInvalidStatus({street: false}))
						!validHouse
								? dispatch(setInvalidStatus({house: true}))
								: dispatch(setInvalidStatus({house: false}))
						validStreet && validHouse && sendCart()
				} else {
						sendCart()
				}
		}

		return (
				<header className="header">
						<img className="menu" src={menu} alt="menu" />
						<img className="logo" src={logo} alt="logo"/>
						<div className="cart-mask">
								<div className="cart-wrapper" onClick={handleSendCart}>
										{amount ? <span>{amount} &#8381;</span> : ''}
										<img src={cart} alt="cart"/>
								</div>
						</div>
				</header>
		)
}
export default Header