import React, { useEffect, useState } from 'react';
import { ToastContainer } from 'react-toastify';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Header from './common/header/Header';
import Pages from './pages/Pages';
import Data from './components/Data';
import Cart from './common/Cart/Cart';
import Footer from './common/footer/Footer';
import Sdata from './components/shops/Sdata';
import Login from './components/auth/Login';
import Signup from './components/auth/Signup';
import EmailVerfication from './components/auth/Email';
import PhoneVerfication from './components/auth/Phone';
import OTPVerfication from './components/auth/Verify';
import axios from 'axios';
import Payment from './components/Payment';
import 'react-toastify/dist/ReactToastify.css';
function App() {
  //Step 1 :
  // const { productItems } = Data;
  const [productItems, setProductItems] = useState([]);
  const { shopItems } = Sdata;

  const [products, setProducts] = useState([]);

  //Step 2 :
  const [CartItem, setCartItem] = useState([]);

  //Step 4 :
  const addToCart = (product) => {
    const productExit = CartItem.find((item) => item.id === product.id);
    if (productExit) {
      setCartItem(
        CartItem.map((item) =>
          item.id === product.id
            ? { ...productExit, qty: productExit.qty + 1 }
            : item
        )
      );
    } else {
      setCartItem([...CartItem, { ...product, qty: 1 }]);
    }
  };

  // Stpe: 6
  const decreaseQty = (product) => {
    // if hamro product alredy cart xa bhane  find garna help garxa
    const productExit = CartItem.find((item) => item.id === product.id);
    if (productExit.qty === 1) {
      setCartItem(CartItem.filter((item) => item.id !== product.id));
    } else {
      setCartItem(
        CartItem.map((item) =>
          item.id === product.id
            ? { ...productExit, qty: productExit.qty - 1 }
            : item
        )
      );
    }
  };

  const getALlProducts = async () => {
    try {
      const result = await axios.get(
        'https://shopproduct.dev/api/v1/products/get-product'
      );
      console.log('_________________________', result.data.products);

      setProductItems(result.data.products);
      // history.push('/sign-in');
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getALlProducts();
  }, []);

  return (
    <>
      <ToastContainer />
      <Router>
        <Header CartItem={CartItem} />
        <Switch>
          <Route path="/" exact>
            <Pages
              productItems={productItems}
              addToCart={addToCart}
              shopItems={shopItems}
            />
          </Route>
          <Route path="/cart" exact>
            <Cart
              CartItem={CartItem}
              addToCart={addToCart}
              decreaseQty={decreaseQty}
            />
          </Route>
          <Route path="/sign-in" exact>
            <Login></Login>
          </Route>
          <Route path="/sign-up" exact>
            <Signup></Signup>
          </Route>
          <Route path="/verification" exact>
            <EmailVerfication></EmailVerfication>
          </Route>
          <Route path="/otp" exact>
            <PhoneVerfication></PhoneVerfication>
          </Route>
          <Route path="/verify-otp" exact>
            <OTPVerfication></OTPVerfication>
          </Route>
          <Route path="/payment/:totalPrice" exact>
            <Payment
              CartItem={CartItem}
              addToCart={addToCart}
              decreaseQty={decreaseQty}
            />
          </Route>
        </Switch>
        <Footer />
      </Router>
    </>
  );
}

export default App;
