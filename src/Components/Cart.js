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
    

    // RAZOR PAY START

    // const loadScript = (src) =>{
    //   return new Promise((resolve) =>{
    //     const script = document.createElement('script');
        
    //     script.src = src;

    //     script.onload = () =>{
    //       resolve(true);
    //     }

    //     script.onerror = () =>{
    //       resolve(false);
    //     }
    //     document.body.appendChild(script);

    //   })
    // }

    // const displayRazorpay = async (amount) => {
    //   const res = await loadScript('https://checkout.razorpay.com/v1/checkout.js');

    //   if(!res){
    //     alert('Eror');
    //   }
    // }

    // const options = {
    //   key: "rzp_test_0ZMfbjrmGjb8xt",
    //   currency: "INR",
    //   amount : total * 100,
    //   name : "Test Ritik",
    //   description : 'Thankls',

    //   handler: function (response) {
    //     alert(response.razorpay_payment_id);
    //     alert("succ")
    //   }
    // }

    // const paymentObject = new window.Razorpay(options);
    // paymentObject.open();


// RAZOR PAY END 



// DEMO RAZORPAY

const loadScript = (src) => {
  return new Promise((resolve) => {
    const script = document.createElement('script');
    script.src = src;

    script.onload = () => {
      resolve(true);
    };

    script.onerror = () => {
      resolve(false);
    };

    document.body.appendChild(script);
  });
};

const initializeRazorpay = (total) => {
  const options = {
    key: "rzp_test_0ZMfbjrmGjb8xt",
    currency: "INR",
    amount: total * 100,
    name: "Test Ritik",
    description: 'Thanks',
    handler: function (response) {
      alert(response.razorpay_payment_id);
      alert("Payment successful");
    }
  };

  const paymentObject = new window.Razorpay(options);
  paymentObject.open();
};

  // const [total, setTotal] = useState(0);

  const handleProceedToPay = () => {
    loadRazorpayScript();
  };

  const loadRazorpayScript = async () => {
    const loaded = await loadScript('https://checkout.razorpay.com/v1/checkout.js');
    if (loaded) {
      console.log('Razorpay script loaded successfully');
      initializeRazorpay(total);
    } else {
      console.error('Failed to load Razorpay script');  
    }
  };

  useEffect(() => {
    // Your useEffect will be triggered only when the 'total' state changes
    // (assuming it's updated when the user selects items or performs relevant actions)
  }, [total]);



  return (
    <div className="container cart_main d-flex gap-4 mt-4 pb-5">
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
        <div>
        <div className='summery'>
          <h3 className="text-center mb-3">Summary</h3>
          <div className="sum_flex"><p>Sub Total</p> <p>₹ {subtotal.toFixed(2)}/-</p></div>
          <div className="sum_flex"><p>Dilivery Charges</p> <p>₹ {deliveryCharges}/-</p></div>
          <div className="sum_flex"><p>Taxes</p> <p>₹ {taxes}/-</p></div>
          <div className="sum_flex bottom_fix"><p>Total</p> <p>₹ {total}/-</p></div>
        </div>
        <button className="btn proc_pay" onClick={() => handleProceedToPay(total)}>Proceed to Pay <i class="uil uil-angle-double-right"></i></button>
</div>
        </>

      )}
    </div>
  );
}

export default Cart;
