import React from 'react';
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';

const PayPalButton = ({ amount, onSuccess, onError }) => {
  const initialOptions = {
    'client-id': 'AWxKgr5n7ex5Lc3fDBOooaVHLgcAB-KCrYXgCmit9DpNXFIuBa6bUypYFjr-hAqARlILGxk_rRTsBZeS',
    currency: 'USD',
    intent: 'capture',
    components: 'buttons',
    'enable-funding': 'venmo,card',
    'disable-funding': 'credit',
  };

  return (
    <PayPalScriptProvider options={initialOptions}>
      <PayPalButtons
        style={{ layout: 'vertical' }}
        createOrder={(data, actions) => {
          return actions.order.create({
            purchase_units: [
              {
                amount: {
                  value: amount,
                },
              },
            ],
          });
        }}
        onApprove={(data, actions) => {
          return actions.order.capture().then((details) => {
            console.log('PayPal payment approved:', details);
            onSuccess(details);
          }).catch((error) => {
            console.error('PayPal capture error:', error);
            onError(error);
          });
        }}
        onError={(err) => {
          console.error('PayPal button error:', err);
          onError(err);
        }}
        onCancel={(data) => {
          console.log('PayPal payment cancelled:', data);
          onError({ message: 'Payment cancelled by user' });
        }}
      />
    </PayPalScriptProvider>
  );
};

export default PayPalButton;