import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useCart } from './ContextReducer';

const Card = (props) => {

  const data = useCart();
  const priceRef = useRef();
  const dispatch = useDispatch();
  const options = props.options || [];
  const foodItem = props.foodItem;
  const [qty, setQty] = useState(1);
  const [size, setSize] = useState(options[0] ? options[0].split(' - ')[0] : "");

  useEffect(() => {
    if (options.length > 0) {
      setSize(options[0].split(' - ')[0]);
    }
  }, [options]);

  const getPrice = (size) => {
    const option = options.find(opt => opt.startsWith(size));
    if (option) {
      const price = option.split(' - ')[1];
      return parseInt(price.replace('rs', '').trim(), 10);
    }
    return 0;
  };
  const finalPrice = qty * getPrice(size);
  const handleAddToCart = async () => {
    let existingItem = data.find(item => item.id === foodItem._id && item.size === size);
    if (existingItem) {
      await dispatch({
        type: "UPDATE",
        id: foodItem._id,
        size: size,
        qty: qty,
        price: finalPrice
      });
    } else {
      await dispatch({
        type: "ADD",
        id: foodItem._id,
        name: foodItem.name,
        price: finalPrice,
        qty,
        size,
        img: foodItem.img,
      });
    }
  };

  return (
    <div className="justify-content-center mt-4">
      <div className="card" style={{ width: "18rem", maxHeight: "400px", overflow: "hidden" }}>
        <div className='w-100'>
          <img
            src={foodItem.img}
            className="card-img-top"
            alt="..."
            style={{ objectFit: "fill", height: "210px" }}
          />
        </div>
        <div className="card-body d-flex flex-column justify-content-between" style={{ overflowY: "auto" }}>
          <div>
            <h5 className="card-title">{foodItem.name}</h5>
          </div>
          <div className="container w-100">
            <select className='m-2 h-70 bg-success rounded' value={qty} onChange={(e) => setQty(parseInt(e.target.value))}>
              {Array.from(Array(10), (e, i) => (
                <option key={i + 1} value={i + 1}>{i + 1}</option>
              ))}
            </select>
            <select className='m-2 h-70 bg-success rounded' value={size} ref={priceRef} onChange={(e) => setSize(e.target.value)}>
              {options.map((data, index) => (
                <option key={index} value={data.split(' - ')[0]}>{data.split(' - ')[0]}</option>
              ))}
            </select>
            <div className='d-inline h-70 fs-5'>
              ₹{finalPrice}/-
            </div>
          </div>
          <hr />
          <button className="btn btn-success justify-center ms-2 w-50" onClick={handleAddToCart}>Add to Cart</button>
        </div>
      </div>
    </div>
  );
};

export default Card;
