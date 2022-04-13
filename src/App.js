import './styles/main.css'
import Header from './components/Header/header'
import DeliveryBlock from './components/DeliveryBlock/deliveryBlock'
import CategoriesBlock from "./components/CategoriesBlock/categoriesBlock";
import CategoryItem from './components/Main/categoryItem'
import Footer from './components/footer/footer'
import {save} from './reducers/categoriesSlice';
import { useDispatch, connect } from 'react-redux';
import { useEffect } from 'react';

function App(props) {
  const dispatch = useDispatch();

  useEffect(() => {
    getProducts()
  },[])

  const getProducts = async () => {
    try {
      const res = await fetch('http://localhost:5000')
      dispatch(save(await res.json()))
    }catch(e) {
      console.log(e)
    }
  }
  return (
    <div className="App">
      <div className="top">
        <Header orders={props.orders} address={props.address}/>
        <DeliveryBlock orders={props.orders} address={props.address} />
      </div>
      <CategoriesBlock />
      <main>
        {
          props.categories.map((category, idx) => (
            <CategoryItem category={category} key={idx} />
          ))
        }
      </main>
      <div className="bottom">
        <Footer/>
      </div>
    </div>
  );
}

function mapStateToProps(state) {
  const categories = state.categories.categories
  const orders = state.orders
  const address = state.address
  return {
    categories,
    orders,
    address
  }
}

const app = connect(mapStateToProps, {})(App)

export default app;
