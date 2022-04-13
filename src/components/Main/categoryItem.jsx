import ProductItem from './productItem';

const CategoryItem = (props) => {
		const { category } = props
		return (
				<div className={`${category.name} category-item`}>
						<span className="category-name">{category.name}</span>
						<div className="products-block" >
								{
										category.productsArr.map((product, idx) => (
												<ProductItem product={product} key={idx} />
										))
								}
						</div>
				</div>
		)
}
export default CategoryItem;