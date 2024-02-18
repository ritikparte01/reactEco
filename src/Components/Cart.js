import React, { useEffect, useState } from "react";
import axios from "axios";
import "./cartCard.css";

function Cart(props) {
  // const [userId, setUserId] = useState("");
  // const [cart, setCart] = useState([]);
  // const [idProd, setIdProd] = useState([]);
  // const [cartIdProd, setCartIdProd] = useState([]);
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    // Retrieve cart items from localStorage on component mount
    const storedCartItems = localStorage.getItem("cartItems");
    if (storedCartItems) {
      setCartItems(JSON.parse(storedCartItems));
    }
  }, []);

  // const total = cart.reduce((acc, item) => acc + item.price, 0);

  // console.log('LOCAL TOKEN', localStorage.getItem('userToken'))

  // const localToken = localStorage.getItem('userToken');

  // useEffect(() => {
  //     axios({
  //       method: 'GET',
  //       url: 'https://api.escuelajs.co/api/v1/auth/profile',
  //       headers:{
  //         Authorization: `Bearer ${localToken}`,
  //       }
  //     }).then((res)=>{
  //       console.log('Auth log',res);
  //       console.log('user id',userId);
  //       setUserId(res.data.id);
  //     }).catch((err) =>{ console.log('Err',err)})
  // }, [localToken])

  // useEffect(() => {
  //   axios.get(`https://fakestoreapi.com/carts/user/41`).then((response) => {
  //     // setCart(response.data);
  //     setCartIdProd(response.data);
  //     console.log('cartIdProd', cartIdProd);
  //     // setLoading(false)
  //     // console.log('User Dynamic Cart', cart);
  //   });
  // }, []);

  // useEffect(() => {
  //   axios.get(`https://fakestoreapi.com/products/${cartIdProd}`).then((response) => {
  //     console.log('Prod ID sent')
  //     setIdProd(response.data);
  //     // setLoading(false)
  //     console.log('Prod from id1', idProd);
  //   });
  // }, [cartIdProd]);

  console.log("Local Cart", cartItems);
  
    // Function to remove an item from the cart
    const removeFromCart = (productId) => {
      const updatedCartItems = cartItems.filter((item) => item.id !== productId);
      setCartItems(updatedCartItems);
      localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
    };


    const subtotal = cartItems.reduce((sum, item) => sum + item.price, 0);
    const deliveryCharges = 350;
    const taxes = 185;
    const total = subtotal + deliveryCharges + taxes;

  return (
    <div className="container d-flex gap-4 mt-4">
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
        <div className="cartCardPer">
          {cartItems.map((item) => (
            <div class="card bg-light">
              <img src={item.image} class="card-img-top" alt={item.title} />
              <div class="card-body">
                <div class="text-section">
                  <h5 class="card-title">{item.title}</h5>
                  <p class="card-text limit_text">
                    {item.description}
                  </p>
                  <div className="d-flex gap-5">
                    <span>Rating : <span className="orange_font">{item.rating.rate}</span>/5</span>
                    <span>Rating Count : <span className="orange_font">{item.rating.count}</span></span>
                  </div>
                </div>
                <div class="cta-section">
                  <div className="orange_font">₹ {item.price} /-</div>
                  <a href="#" class="btn btn-danger" onClick={() => removeFromCart(item.id)} >
                  <i class="uil uil-trash-alt"></i> Remove Item
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className='summery'>
          <h3 className="text-center mb-3">Summary</h3>
          <div className="sum_flex"><p>Sub Total</p> <p>₹ {subtotal}/-</p></div>
          <div className="sum_flex"><p>Dilivery Charges</p> <p>₹ {deliveryCharges}/-</p></div>
          <div className="sum_flex"><p>Taxes</p> <p>₹ {taxes}/-</p></div>
          <div className="sum_flex bottom_fix"><p>Total</p> <p>₹ {total}/-</p></div>
        </div>
        </>

      )}
    </div>
  );
}

export default Cart;
