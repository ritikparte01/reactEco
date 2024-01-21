import React from "react";

function Cart(props) {
  const { cart } = props;
  const total = cart.reduce((acc, item) => acc + item.price, 0);
  return (
    <div className="container">
      {cart.map((item) => (
        <>
          <div className="cart-box">
            <div className="product-name">
            {item.title}
            </div>
            <div className="product-price">
            {Math.round(item.price * 81)} ₹
            </div>
            <div className="close-section">
            </div>
          </div>
          <div className="total">
          </div>
          </>
        ))}
        <hr />
        <div className="total-price">
          <div className="total-text">
            <h4>Total Amout</h4>
          </div>
          <div className="total-amt">
          <h4>{Math.round(total * 81)} ₹</h4>
          </div>
        </div>
    </div>
  );
}

export default Cart;
