import React, { useEffect, useRef } from 'react';

const PayButton = ({ onPaymentSuccess }) => {
  const paypalRef = useRef(null);

  useEffect(() => {
    // Limpia PayPal antes de renderizar
    if (window.paypal && paypalRef.current && paypalRef.current.children.length === 0) {
      window.paypal.Buttons({
        createOrder: function(data, actions) {
          return actions.order.create({
            purchase_units: [{
              amount: {
                value: '2.00',
              },
            }],
          });
        },
        onApprove: function(data, actions) {
          return actions.order.capture().then(function(details) {
            onPaymentSuccess(details);
          });
        },
        style: {
          layout: 'vertical',
          color: 'blue',
          shape: 'rect',
          label: 'paypal'
        }
      }).render(paypalRef.current);
    }
  }, [onPaymentSuccess]);

  return <div ref={paypalRef} />;
};

export default PayButton;