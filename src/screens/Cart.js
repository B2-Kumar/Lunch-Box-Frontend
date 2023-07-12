import React, { useState, useEffect } from 'react';
import { useCart, useDispatchCart } from '../components/ContextReducer';
import Payment from './Payment';

function Cart() {
  const [orderPlaced, setOrderPlaced] = useState(false);
  let data = useCart();
  let dispatch = useDispatchCart();

  useEffect(() => {
    setOrderPlaced(false);
  }, [data]);

  if (data.length === 0) {
    return (
      <div>
        <div className='m-5 w-100 text-center fs-3'>The Cart is Empty!</div>
      </div>
    );
  }

  const handleCheckOut = async () => {
    let userEmail = localStorage.getItem('userEmail');
    let response = await fetch('https://backendlunchbox.onrender.com/api/orderData', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        order_data: data,
        email: userEmail,
        order_date: new Date().toDateString()
      })
    });

    console.log('JSON RESPONSE:::::', response.status);

    if (response.status === 200) {
      dispatch({ type: 'DROP' });
      setOrderPlaced(true);
    } else {
      console.log('Order placement failed');
    }
  };

  let totalPrice = data.reduce((total, food) => total + food.price, 0);

  return (
    <div>
      {console.log(data)}
      <div className='container m-auto mt-5' style={{ maxHeight: '80vh', overflow: 'auto' }}>
        {orderPlaced && (
          <div className='m-5 w-100 text-center fs-3 text-success'>
            Order Successful!
          </div>
        )}
        <table className='table table-hover'>
          <thead className='text-success fs-4'>
            <tr>
              <th scope='col'>#</th>
              <th scope='col'>Name</th>
              <th scope='col'>Quantity</th>
              <th scope='col'>Option</th>
              <th scope='col'>Amount</th>
              <th scope='col'></th>
            </tr>
          </thead>
          <tbody>
            {data.map((food, index) => (
              <tr key={index}>
                <th scope='row'>{index + 1}</th>
                <td>{food.name}</td>
                <td>{food.qty}</td>
                <td>{food.size}</td>
                <td>{food.price}</td>
                <td>
                  <button
                    type='button'
                    className='btn btn-danger'
                    style={{ padding: '0.5rem', borderRadius: '5px', color: '#fff' }}
                    onClick={() => {
                      dispatch({ type: 'REMOVE', index: index });
                    }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className='mt-3'>
          <h1 className='fs-2'>Total Price: {totalPrice}/-</h1>
        </div>
        <div className='btn bg-success m-3'>
          <Payment totalPrice={totalPrice} onSuccess={handleCheckOut} />
        </div>
      </div>
    </div>
  );
}

export default Cart;