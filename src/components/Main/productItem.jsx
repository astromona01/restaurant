import { connect, useDispatch } from 'react-redux';
import { addOrder, removeOrder } from '../../reducers/ordersSlice';
import { setCartMark, removeCartMark } from '../../reducers/categoriesSlice';
import { useEffect, useState } from "react";
import lazySizes from "lazysizes";

const ProductItem = (props) => {
		const { product } = props;
		const dispatch = useDispatch();
		const [greyBack, setGreyBack] = useState(false)
		const [whiteBack, setWhiteBack] = useState(false)

		useEffect( () => {
				if ('loading' in HTMLImageElement.prototype) {
						const images = document.querySelectorAll("img.lazyload");
						images.forEach(img => {
								img.src = img.dataset.src;
						});
				} else {
						LazySizes()
				}
		},[])

		const LazySizes = () => {
				lazySizes.init()
	}

		const addProduct = () => {
				dispatch(addOrder(product))
				dispatch(setCartMark(product))
		}
		const removeProduct = () => {
				dispatch(removeOrder(product.id))
				dispatch(removeCartMark(product))
		}
		const startHoverEmit = (e) => {
				const categoryBlock = e.target.closest('.category-item')
				const blockBackColor = window.getComputedStyle(categoryBlock, null)
																											.getPropertyValue('background-color')
				if (blockBackColor === 'rgb(247, 246, 245)') {
						setGreyBack(true)
				} else {
						setWhiteBack(true)
				}
		}
		const stopHoverEmit = () => {
				setGreyBack(false)
				setWhiteBack(false)
		}

		return (
				<div onMouseLeave={stopHoverEmit} onMouseEnter={startHoverEmit} className={
						`${product.cartProduct ? 'cart-product' : ''} product-item
						${greyBack ? 'grey-back-category' : ''}
						${whiteBack ? 'white-back-category' : ''}
						`
				}>
						<div className="add-button">
								{product.cartProduct ?
								<span>
										<span onClick={removeProduct} >-</span>
										<span>{product.quantity}</span>
								</span>
								: ''}
								<span onClick={addProduct}>+</span>
						</div>
						<img data-src={product.new} alt="product" loading="lazy" className="product-icon lazyload"/>
						<img data-src={product.img} alt="product" loading="lazy" className="lazyload"/>
						<div className="product-info">
								<div>{product.name}</div>
								<div>{product.price} &#8381;</div>
						</div>
				</div>
		)
}
function mapStateToProps(state) {
		const orders = state.orders
		return {
				orders,
		}
}
const productItem = connect(mapStateToProps, {})(ProductItem)
export default productItem;