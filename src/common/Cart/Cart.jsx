import React, { useEffect, useState } from 'react';
import './style.css';
import { Button } from 'antd';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

const Cart = ({ CartItem, addToCart, decreaseQty }) => {
  const history = useHistory();
  // Stpe: 7   calucate total of items
  const totalPrice = CartItem.reduce(
    (price, item) => price + item.qty * item.price,
    0
  );

  const [user, setUser] = useState({});

  const getUser = async () => {
    const authToken = JSON.parse(localStorage.getItem('token'));
    const refreshToken = JSON.parse(localStorage.getItem('refreshToken'));
    try {
      const result = await axios.get(
        'https://shopproduct.dev/api/v1/users/current-user',
        {
          headers: {
            authorization: `Bearer ${authToken}`,
            xrefresh: refreshToken,
          },
        }
      );
      console.log('___________________', result.data);

      setUser(result.data);
      // history.push('/sign-in');
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  const handleLogin = () => {
    history.push('/sign-in');
  };

  const handleCheckout = async () => {
    history.push(`/payment/${totalPrice}`);
  };
  // prodcut qty total
  return (
    <>
      <section className="cart-items">
        <div className="container d_flex">
          <div className="cart-details">
            {CartItem.length === 0 && (
              <h1 className="no-items product">No Items are add in Cart</h1>
            )}

            {CartItem.map((item) => {
              const productQty = item.price * item.qty;

              return (
                <div className="cart-list product d_flex" key={item.id}>
                  <div className="img">
                    <img src={item.cover} alt="" />
                  </div>
                  <div className="cart-details">
                    <h3>{item.name}</h3>
                    <h4>
                      ${item.price}.00 * {item.qty}
                      <span>${productQty}.00</span>
                    </h4>
                  </div>
                  <div className="cart-items-function">
                    <div className="removeCart">
                      <button className="removeCart">
                        <i className="fa-solid fa-xmark"></i>
                      </button>
                    </div>

                    <div className="cartControl d_flex">
                      <button
                        className="incCart"
                        onClick={() => addToCart(item)}
                      >
                        <i className="fa-solid fa-plus"></i>
                      </button>
                      <button
                        className="desCart"
                        onClick={() => decreaseQty(item)}
                      >
                        <i className="fa-solid fa-minus"></i>
                      </button>
                    </div>
                  </div>

                  <div className="cart-item-price"></div>
                </div>
              );
            })}
          </div>

          <div className="cart-total product">
            <h2>Cart Summary</h2>
            <div className=" d_flex">
              <h4>Total Price :</h4>
              <h3>${totalPrice}.00</h3>
            </div>
            <div className="">
              {user ? (
                <Button onClick={handleCheckout}>CHECKOUT</Button>
              ) : (
                <Button onClick={handleLogin}>LOGIN TO PROCEED</Button>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Cart;
