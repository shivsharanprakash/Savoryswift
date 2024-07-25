import React, { useState, useEffect } from 'react';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';

function Myorders() {
  const [orderData, setOrderData] = useState([]);
  const fetchMyOrder = async () => {
    const response = await fetch("http://localhost:3001/api/myorderData", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: localStorage.getItem('userEmail'),
      }),
    });

    const result = await response.json();
    setOrderData(result.orderData ? [result.orderData] : []);
  };

  useEffect(() => {
    fetchMyOrder();
  }, []);

  return (
    <div>
      <div>
        <Navbar />
      </div>
      <div className='container'>
        <div className='row'>
          {orderData.length > 0 ? orderData.map((data, index) => {
            return (
              data.Order_data ?
                data.Order_data.slice(0).reverse().map((item, idx) => {
                  return (
                    <div key={`${index}-${idx}`}>
                      {item.map((arraydata, i) => {
                        return (
                          <div key={i}>
                            {arraydata.Order_date ? (
                              <div className='m-auto mt-5'>
                                <div>{arraydata.Order_date}</div>
                                <hr />
                              </div>
                            ) : (
                              <div className='col-12 col-md-6 col-lg-3'>
                                <div className="card mt-3" style={{ width: "16rem", maxHeight: "360px" }}>
                                  <img src={arraydata.img} className="card-img-top" alt="..." style={{ height: "120px", objectFit: "fill" }} />
                                  <div className="card-body">
                                    <h5 className="card-title">{arraydata.name}</h5>
                                    <div className='container w-100 p-0' style={{ height: "38px" }}>
                                      <span className='m-1'>{arraydata.qty}</span>
                                      <span className='m-1'>{arraydata.size}</span>
                                      <div className='d-inline ms-2 h-100 w-20 fs-5'>
                                        ₹{arraydata.price}/-
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  );
                })
                : null
            );
          }) : <div>No orders found</div>}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Myorders;
