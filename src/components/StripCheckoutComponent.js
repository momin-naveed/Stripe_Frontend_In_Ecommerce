import React, { useState, useEffect } from 'react';
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
// import { createStripIntent } from '../../functions/stripe';
import { Link } from 'react-router-dom';
import { Card } from 'antd';
import { DollarOutlined, CheckOutlined } from '@ant-design/icons';
import axios from 'axios';
import { useParams, useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';

const StripCheckoutComponent = () => {
  const { totalPrice } = useParams();
  const history = useHistory();
  const [succeeded, setSucceeded] = useState(false);
  const [error, setError] = useState(null);
  const [disabled, setDisabled] = useState(true);
  const [clientSecret, setClientSecret] = useState('');
  const [processing, setProcessing] = useState(false);

  const [cartTotal, setCartTotal] = useState(0);
  const [payable, setPayable] = useState(0);
  const [totalAfterDiscount, setTotalAfterDiscount] = useState(0);

  const stripe = useStripe();
  const elements = useElements();

  const stripeIntent = async () => {
    try {
      const result = await axios.post(
        'https://shopproduct.dev/api/v1/products/create-strip-intent',
        { cartTotal: Number(totalPrice) }
      );

      console.log(result.data);
      setClientSecret(result.data.clientSecret);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    stripeIntent();
  }, []);

  //submite the payment
  const handleSubmite = async (e) => {
    try {
      e.preventDefault();
      setProcessing(true);

      // console.log(clientSecret);

      const payload = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
          billing_details: {
            name: 'Momin Naveed',
            address: {
              line1: 'Bahawalpur',
            },
          },
        },
      });

      console.log(payload);
      //check the payment if its success or got any error
      if (payload.error) {
        console.log(payload.error);
        setProcessing(false);
        if (
          payload.error.message ===
          'As per Indian regulations, export transactions require a customer name and address. More info here: https://stripe.com/docs/india-exports'
        ) {
          toast.success('Payment SuccessFull.');
          history.push('/');
        } else {
          setError(`Pyament Faild ${payload.error.message}`);
        }
      } else {
        toast.success('Payment SuccessFull.');
        //if customer success in payment
        //here get the result successfull result
        //create ordre and save in database for admin to process
        // empty the cart from local storage and redux state

        console.log(JSON.stringify(payload, null, 4));

        //create new order save in database

        setProcessing(false);
        setError(null);
        setSucceeded(true);
      }
    } catch (err) {
      console.log('STRIO ERROR', err);
    }
  };

  const handleChange = (e) => {
    //listen for changing in elementCard
    setDisabled(e.empty); //disable pay button if error
    //and display the error if the customer give invalid card
    setError(e.error ? e.error.message : ''); //show the error message
  };

  const cartStyle = {
    style: {
      base: {
        color: '#32325d',
        fontFamily: 'Arial, sans-serif',
        fontSmoothing: 'antialiased',
        fontSize: '16px',
        '::placeholder': {
          color: '#32325d',
        },
      },
      invalid: {
        color: '#fa755a',
        iconColor: '#fa755a',
      },
    },
  };

  return (
    <>
      <p className={succeeded ? 'result-message' : 'result-message hidden'}>
        Payment Successful.
        <Link to="/user/history">See in your purchase history</Link>
      </p>

      {!succeeded && (
        <div>
          {totalAfterDiscount !== undefined ? (
            <div className="alert alert-success">
              {`Total Price After Discount $: ${totalPrice}`}{' '}
            </div>
          ) : (
            <div className="alert alert-danger"> No Coupon Applied...</div>
          )}
        </div>
      )}

      <form id="payment-form" className="stripe-form" onSubmit={handleSubmite}>
        <div className="text-center pb-5">
          <Card
            cover={
              <img
                src="https://images.unsplash.com/photo-1620714223084-8fcacc6dfd8d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8cGF5bWVudHxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60"
                alt="laptop"
                style={{
                  height: '200px',
                  objectFit: 'cover',
                  marginBottom: '-50px',
                }}
              />
            }
            actions={[
              <>
                <DollarOutlined className="text-info" />
                <br /> Total: ${totalPrice}
              </>,
              <>
                <CheckOutlined className="text-info" />
                <br /> Total after Discount: ${totalPrice}
              </>,
            ]}
          ></Card>
        </div>
        <CardElement
          id="card-element"
          options={cartStyle}
          onChange={handleChange}
        />
        <button
          className="stripe-button"
          disabled={processing || disabled || succeeded}
        >
          <span id="button-text">
            {processing ? <div className="spinner" id="spinner"></div> : 'Pay'}
          </span>
        </button>
        {error && <div className="card-error pt-2"> {error}</div>}
      </form>
    </>
  );
};

export default StripCheckoutComponent;
