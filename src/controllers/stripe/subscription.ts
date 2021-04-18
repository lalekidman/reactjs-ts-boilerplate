import React, { useState } from 'react'
import {Elements, CardElement, CardElementComponent, ElementsConsumer, useStripe, useElements} from '@stripe/react-stripe-js';
import {loadStripe, StripeCardElement} from '@stripe/stripe-js';
import { Modal, Button, Form } from 'react-bootstrap';
import Http from 'axios'
import QueryString from 'query-string'
const stripePK = process.env.REACT_APP_STRIPE_PUBLIC_KEY as string
// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const cardElementOptions = {
  hidePostalCode: true
}
const stripePromise = loadStripe(stripePK);
const App = (props: any) => {
  
  return (
    <Elements stripe={stripePromise}>
      <CheckoutForm
      {...props}
      />
    </Elements>
  );
};
function CheckoutForm(props: any) {
  const [isPaymentLoading, setPaymentLoading] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false)
  const [paymentForm, setPaymentForm] = useState(() => ({fullName: "", email: ""}))
  const stripe = useStripe();
  const elements = useElements();
  const queryParams = QueryString.parse(props.location.search)
  const createPaymentIntents = async (params: any) => {
    const keepCardDetails = true
    // set the payment method, for this. by card.
    // const {paymentMethod, error} = (await stripe?.createPaymentMethod({
      // type: "card",
      // card: cardElement as StripeCardElement,
      // billing_details: {
      //   name: "Darryl Fabian",
      //   email: "mailmail@mailnesia.com",
      // }
    // })) as any
    // if (error) {
    //   alert(error.message)
    //   return
    // }
    // console.log('paymentMethod :>> ', error);
    // console.log('paymentMethod :>> ', paymentMethod);
    const {data} = await Http({
      method: "POST",
      baseURL: "http://localhost:3000",
      // baseURL: "https://electronapi.westus.cloudapp.azure.com",
      url: "/v1/products/purchase",
      headers: {
        Authorization: `Bearer ${queryParams.token}`
      },
      // url: "/api/stripe/customers",
      data: {
        productId: queryParams.productId,
        // amount: 7 * 10 0,
        // paymentMethodId: paymentMethod.id,
        keepCardDetails
      }
    })
    const {result} = data
    console.log('result :>> ', result);
    console.log('====================================================================================================');
    console.log('result.payment :>> ', result.payment);
    const confirmedCardPayment = await stripe?.confirmCardPayment(result.payment.client_secret, {
      payment_method: `pm_1INArBJaPB01C3qHt9QREDYL`
    })
    // console.log('paymentMethodReq >>> :>> ', source);
    // // confirming the card payment
    
    console.log('confirmedCardPayment :>> ', confirmedCardPayment);
  }
  const handlePaymentFormSubmitButton = () => {
    console.log('paymentForm :>> ', paymentForm);
    createPaymentIntents(paymentForm)
  }
  const handlePaymentForm = (params: any) => {
    setPaymentForm((previousValue) => ({...previousValue, ...params}))
  }
  return (
    <>
    <Button onClick={() => setShowPaymentModal(true)}>Show Modal</Button>
      Hello world
      <Modal
          show={showPaymentModal}
          onHide={() => setShowPaymentModal(false)}
          backdrop="static"
          keyboard={false}
          >
          <Modal.Header closeButton>
            <Modal.Title>Modal title</Modal.Title>
          </Modal.Header>

          <Modal.Body>
          <Form.Group>
            <Form.Label>Full Name</Form.Label>
            <Form.Control
              placeholder="Full Name"
              value={paymentForm.fullName}
              onChange={(e) => handlePaymentForm({fullName: e.target.value})}
              />
          </Form.Group>
          <Form.Group>
            <Form.Label>Email address</Form.Label>
            <Form.Control
              placeholder="Email Address"
              value={paymentForm.email}
              onChange={(e) => handlePaymentForm({email: e.target.value})}
              />
          </Form.Group>
          <Form.Group>
            <Form.Label>Complete Address</Form.Label>
            <Form.Control
              placeholder="Complete Address"
              />
          </Form.Group>
              {/* <div style={{border: "1px solid #ced4da", padding:"10px", borderRadius: "5px"}}>
                <CardElement
                  options={{
                    iconStyle: "solid",
                    hidePostalCode:true,
                    style:{
                      base: {
                        
                      }
                    }
                  }}
                />
              </div> */}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowPaymentModal(false)}>Close</Button>
            <Button variant="primary" onClick={handlePaymentFormSubmitButton}>Save changes</Button>
          </Modal.Footer>
        </Modal>
    </>
  );
}
export default App