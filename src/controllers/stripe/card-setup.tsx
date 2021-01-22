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

  const setupCustomerCard = async (params: any) => {
    // create a payment intent on server side to generate a client token for verification of the payment.
    try {
      const cardElement = elements?.getElement(CardElement)
      // set the payment method, for this. by card.
      const {data} = await Http({
        method: "POST",
        baseURL: "http://localhost:3000",
        url: "/v1/users/9d67fd5c-0266-43b4-a7fd-0efaa636a82a/settings/payments/set-up",
        // url: "/api/stripe/customers/cus_InIAnE1ROn23dy/intent",
        data: {},
        headers: {
          Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyZWZlcmVuY2VJZCI6IjlkNjdmZDVjLTAyNjYtNDNiNC1hN2ZkLTBlZmFhNjM2YTgyYSIsInRva2VuVHlwZSI6IlNJR05fSU4iLCJpYXQiOjE2MTEzMDg3MTYsImV4cCI6MTYxMTMxNTkxNn0.NrcBdG4CdzBmyq3gHTaPJPNOTePH9NCE3I-cD76uGs4`
        }
      })
      const confirmedCardPayment = await stripe?.confirmCardSetup(data.result, {
        payment_method: {
          card: cardElement as StripeCardElement
        }
      })
      console.log('confirmedCardPayment :>> ', confirmedCardPayment);
    } catch (error) {
      throw error
    }

    // stripe.
    // console.log('paymentMethodReq >>> :>> ', source);
    // // confirming the card payment
    
    // console.log('confirmedCardPayment :>> ', confirmedCardPayment);
  }
  const handlePaymentFormSubmitButton = () => {
    setupCustomerCard(paymentForm)
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
              <div style={{border: "1px solid #ced4da", padding:"10px", borderRadius: "5px"}}>
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
              </div>
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