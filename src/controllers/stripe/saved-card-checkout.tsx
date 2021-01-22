import React, { useState } from 'react'
import {Elements, CardElement, CardElementComponent, ElementsConsumer, useStripe, useElements} from '@stripe/react-stripe-js';
import {loadStripe, StripeCardElement} from '@stripe/stripe-js';
import { Modal, Button, Form } from 'react-bootstrap';
import Http from 'axios'
const stripePK = process.env.REACT_APP_STRIPE_PUBLIC_KEY as string
// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const cardElementOptions = {
  hidePostalCode: true
}
const stripePromise = loadStripe(stripePK);
const App = () => {
  
  return (
    <Elements stripe={stripePromise}>
      <CheckoutForm
      />
    </Elements>
  );
};
function CheckoutForm({}: any) {
  const [isPaymentLoading, setPaymentLoading] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false)
  const [paymentForm, setPaymentForm] = useState(() => ({fullName: "", email: ""}))
  const stripe = useStripe();
  const elements = useElements();

  const createPaymentIntents = async (params: any) => {
    // create a payment intent on server side to generate a client token for verification of the payment.
    // const {data} = await Http({
    //   method: "POST",
    //   baseURL: "http://localhost:3005",
    //   url: "/api/stripe/payment-intent",
    //   data: {
    //     amount: 5 * 100
    //   }
    // })
    // const cardElement = elements?.getElement(CardElement)
    // // set the payment method, for this. by card.
    // const {paymentMethod, error} = (await stripe?.createPaymentMethod({
    //   type: "card",
    //   card: cardElement as StripeCardElement,
    //   billing_details: {
    //     name: "Darryl Fabian",
    //     email: "mailmail@mailnesia.com",
    //   }
    // })) as any
    // const {data} = await Http({
    //   method: "POST",
    //   baseURL: "http://localhost:3005",
    //   url: "/api/stripe/customers",
    //   data: {
    //     amount: 5 * 100,
    //     paymentMethodId: paymentMethod.id
    //   }
    // })
    const confirmedCardPayment = await stripe?.confirmCardPayment("seti_1IBx71Fg6sgpRYiysiXi4r2r_secret_InYD891FUhY52s93uvXHDiAHU83WnUo", {
      payment_method: "seti_1IBx71Fg6sgpRYiysiXi4r2r"
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