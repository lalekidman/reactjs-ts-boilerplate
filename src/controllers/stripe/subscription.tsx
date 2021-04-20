import React, { useState } from 'react'
import {Elements, CardElement, CardElementComponent, ElementsConsumer, useStripe, useElements} from '@stripe/react-stripe-js';
import {loadStripe, StripeCardElement} from '@stripe/stripe-js';
import { Modal, Button, Form } from 'react-bootstrap';
import Http from 'axios'
import QueryString from 'query-string'
import StripeCheckout from 'react-stripe-checkout'
const stripePK = process.env.REACT_APP_STRIPE_PUBLIC_KEY as string
// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const cardElementOptions = {
  hidePostalCode: true
}
const App = (props: any) => {
  const [stripe] = useState(async() => {
    return await loadStripe(stripePK);
  })
  const [queryParams] = useState(() => QueryString.parse(props.location.search))
  const handlePaymentButton = async () => {

    
    const {data} = await Http({
      method: "POST",
      baseURL: "http://localhost:3000",
      // url: "/",
      url: "/payment-gateway/checkout-session",
      data: {
        priceId: `price_0IhasvY3JExjTiTwvAFofjDQ`,
        // priceId: `price_0IhasvY3JExjTiTwqv8NTYL3`,
      },
      headers: {
        Authorization: `Bearer ${queryParams.token}`
      }
    })
    const {sessionId} = data
    console.log('data :>> ', data);
    console.log('====================================================================================================');
    const checkout = (await stripe)?.redirectToCheckout({
      sessionId: sessionId,
      
    })
    // console.log('paymentMethodReq >>> :>> ', source);
    // // confirming the card payment
    
    // console.log('checkout :>> ', checkout);
  }
  return (
    <>
      <button id="checkout">Subscribe</button>
      <button
        role="link"
        onClick={handlePaymentButton}
        disabled={!stripe}
      >
        Simple checkout
      </button>
    </>
    // <Elements>
    //   {/* <CheckoutForm
    //   {...props}
    //   /> */}
    // </Elements>
  );
};
export default App