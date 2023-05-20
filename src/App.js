import React, { useState, useEffect } from 'react';
import { initMercadoPago, Wallet } from '@mercadopago/sdk-react';

initMercadoPago('APP_USR-46e63112-b644-4e98-a54f-957a411776ae');

const App = () => {
  const [preferenceId, setPreferenceId] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const preference = {
        items: [
          {
            title: "Mi producto",
            unit_price: 10,
            quantity: 1,
          },
        ],
      };

      try {
        const response = await fetch("https://api.mercadopago.com/checkout/preferences", {
          method: "POST",
          headers: {
            Authorization: "Bearer APP_USR-8842171396041507-051919-9a7f455f0217de32eaf0374d60070293-1378960406",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(preference),
        });

        if (!response.ok) {
          throw new Error("Error en la solicitud");
        }

        const data = await response.json();
        console.log('data',
          data);
        setPreferenceId(data.id);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);
  let setWallet = false;

  if (preferenceId !== "" && !setWallet) {
    setWallet = true;

    return (
      <Wallet initialization={{ preferenceId: preferenceId }} />
    );
  }
}

export default App;