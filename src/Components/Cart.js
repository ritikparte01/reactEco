import React, { useEffect, useState } from "react";
import axios from "axios";
import "./cartCard.css";
import { Player } from '@lottiefiles/react-lottie-player';
import { Toaster, toast } from 'sonner'
import Swal from 'sweetalert2'
import Footer from './Footer';

function Cart(props) {
  // const [userId, setUserId] = useState("");
  // const [cart, setCart] = useState([]);
  // const [idProd, setIdProd] = useState([]);
  // const [cartIdProd, setCartIdProd] = useState([]);
  const [userName, setUserName] = useState("");
  const [cartItems, setCartItems] = useState([]);
  const [paymentID, setPaymentID] = useState("");
  const [discount, setDiscount] = useState("");
  const [singlePrice, setSinglePrice] = useState("");
  const [DiscountedPrice, setDiscountedPrice] = useState("");
  const [totalDiscountedAmount, setTotalDiscountedAmount] = useState("");
  const [productsCount, setProductsCount] = useState("");
  const [isAddDetails, setAddDetails] = useState(false);

  useEffect((userId) => {
    // Retrieve cart items from localStorage on component mount
    const storedCartItems = localStorage.getItem(`cartItems_${userId}`);
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

  const localToken = localStorage.getItem('userToken');

  useEffect(() => {
    axios({
      method: 'GET',
      url: 'https://api.escuelajs.co/api/v1/auth/profile',
      headers: {
        Authorization: `Bearer ${localToken}`,
      }
    }).then((res) => {
      setUserName(res.data.name);
    })
  }, [])

  // Function to remove an item from the cart
  const removeFromCart = (productId) => {
    const updatedCartItems = cartItems.filter((item) => item.id !== productId);
    setCartItems(updatedCartItems);
    localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
    toast.error('Product Removed');
  };


  const subtotal = cartItems.reduce((sum, item) => sum + item.price * 10, 0);
  const deliveryCharges = 350;
  // const taxes = subtotal * 18/100;
  const total = subtotal - totalDiscountedAmount + deliveryCharges;
  const singlepriceArray = cartItems.map((item) => item.price * 10);

  console.log(singlepriceArray);


  // const totalDiscountedAmount = cartItems.map((item) => (<> {`${(item.price * 10)} - ${(item.price * 10)/100 }`}</>));

  useEffect(() => {
    const priceTen = cartItems.reduce((sum, item) => sum + item.price * 10, 0);
    console.log('asdaasd', priceTen);
    const totalDisamt = priceTen * 20 / 100;
    const calcDiss = priceTen - totalDisamt;
    const disscountedVal = priceTen - calcDiss;
    setTotalDiscountedAmount(disscountedVal);
    console.log('LPA', totalDiscountedAmount);
  }, [subtotal])

  // const totalDiscountedAmount = DiscountedPrice.map((sum, item) => sum + item);

  console.log('disamt', totalDiscountedAmount);

  useEffect(() => {
    setDiscount(singlePrice / 100 * 20)
    setDiscountedPrice(singlePrice - discount);
  })

  useEffect(() => {
    setProductsCount(cartItems.length)
  })


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
      name: `${userName}`,
      description: 'Thanks',
      handler: function (response) {
        // alert(response.razorpay_payment_id);
        // alert("Payment successful");
        console.log(response);
        setPaymentID(response.razorpay_payment_id);
        Swal.fire({
          title: "Payment successful",
          text: `Payment Reciept ID:  ${response.razorpay_payment_id}`,
          icon: "success"
        })

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

  // RAZOR PAY END 


  const defaultImageUrl = 'https://digiday.com/wp-content/uploads/sites/3/2021/11/blockchain-broken-gif.gif?w=1030&h=579&crop=1';
  const handleImageError = (event) => {
    event.target.src = defaultImageUrl;
  };

  const handleAddTab = () => {
    setAddDetails(true);
  }
  const handleAddTabFalse = () => {
    setAddDetails(false);
  }


  // for payment btn ------------------------------------
  // onClick={() => handleProceedToPay(total.toFixed(2))}

  return (
    <>


      {isAddDetails ?
        <>
          <div className="container back_cart_btn" onClick={() => handleAddTabFalse()}><i class="uil uil-previous"></i> Back to cart</div>
          <div className="container d-flex gap-4 mt-1 pb-5">
            <div className="cartCardPer">
              <div class="form_main">
                <h1>Shipping</h1>
                <p>Please enter your shipping details.</p>
                <hr />
                <div class="form">

                  <div class="fields fields--2">
                    <label class="field">
                      <span class="field__label" for="firstname">First name</span>
                      <input class="field__input" type="text" id="firstname" value="John" />
                    </label>
                    <label class="field">
                      <span class="field__label" for="lastname">Last name</span>
                      <input class="field__input" type="text" id="lastname" value="Doe" />
                    </label>
                  </div>
                  <label class="field">
                    <span class="field__label" for="address">Address</span>
                    <input class="field__input" type="text" id="address" />
                  </label>
                  <div class="fields fields--2">
                  <label class="field">
                      <span class="field__label" for="zipcode">10-Digit Mobile Number</span>
                      <input class="field__input" type="text" id="zipcode" />
                    </label>
                  <label class="field">
                    <span class="field__label" for="country">Country</span>
                    <select class="field__input" id="country">
                      <option value=""></option>
                      <option value="unitedstates">United States</option>
                    </select>
                  </label>
                  </div>
                  <div class="fields fields--3">
                    <label class="field">
                      <span class="field__label" for="zipcode">Zip code</span>
                      <input class="field__input" type="text" id="zipcode" />
                    </label>
                    <label class="field">
                      <span class="field__label" for="city">City</span>
                      <input class="field__input" type="text" id="city" />
                    </label>
                    <label class="field">
                      <span class="field__label" for="state">State</span>
                      <select class="field__input" id="state">
                        <option value=""></option>
                      </select>
                    </label>
                  </div>
                </div>
                <hr />
                <button class="button">Save Address</button>
              </div>
            </div>

            <div className="summ_par">
              <div className='summary'>
                <h3 className="text-left mb-3">PRICE DETAILS</h3>
                <div className="sum_flex"><p>Price ({productsCount} Products)</p> <p>₹ {subtotal}/-</p></div>
                <div className="sum_flex"><p>Discount</p> <p className="text-green">- ₹ {totalDiscountedAmount}/-</p></div>
                <div className="sum_flex"><p>Delivery Charges</p> <p>₹ {deliveryCharges}/-</p></div>
                {/* <div className="sum_flex"><p>GST</p> <p>₹ {taxes}/-</p></div> */}
                <div className="sum_flex bottom_fix"><b>Total Amount</b> <b>₹ {total}/-</b></div>
                <p className="save_line">You will save ₹{totalDiscountedAmount} on this order</p>
              </div>
              <button className="btn proc_pay" onClick={() => handleProceedToPay(total.toFixed(2))}>PLACE ORDER <i class="uil uil-angle-double-right"></i></button>
            </div>


          </div>

        </>
        :
        <div className="container cart_main d-flex gap-4 mt-4 pb-5">
          <Toaster position="top-right" richColors closeButton />
          {cartItems.length === 0 ? (
            <div className="empty_cart">
              <Player
                autoplay
                loop
                src="https://lottie.host/88a15f65-b6e8-4941-96cc-ecab7daa3d33/iTRmDAEdRg.json"
                style={{ height: '40%', width: '40%' }}
              >
              </Player>
              <p className="text-center display-5">Your Cart is <sapn class="orange_text fw-bolder">Empty!!!</sapn></p>
            </div>
          ) : (
            <>
              <div className="cartCardPer">
                {cartItems.map((item) => (
                  <>
                    <div class="card bg-transparent">
                      {item && item.images && item.images.length > 0 && (
                        <img src={item.images[0]} onError={handleImageError} className="card-img-top" alt={item.title} />
                      )}
                      <div class="card-body">
                        <div class="text-section">
                          <h5 class="card-title">{item.title}</h5>
                          <p class="card-text limit_text">
                            {item.description}
                          </p>



                        </div>
                        <div class="cta-section">

                          <div className="orange_font"> <del className="text-dashed"> ₹ {item.price * 10}</del> ₹ {`${item.price * 10}` - `${(item.price * 10) * 20 / 100}`} /-</div>
                          <a href="#" class="btn remove_btn" onClick={() => removeFromCart(item.id)} >
                            <i class="uil uil-trash-alt"></i>
                          </a>
                        </div>
                      </div>
                    </div>
                    <hr className="divider" />
                  </>
                ))}
              </div>
              <div className="summ_par">
                <div className='summary'>
                  <h3 className="text-left mb-3">PRICE DETAILS</h3>
                  <div className="sum_flex"><p>Price ({productsCount} Products)</p> <p>₹ {subtotal}/-</p></div>
                  <div className="sum_flex"><p>Discount</p> <p className="text-green">- ₹ {totalDiscountedAmount}/-</p></div>
                  <div className="sum_flex"><p>Delivery Charges</p> <p>₹ {deliveryCharges}/-</p></div>
                  {/* <div className="sum_flex"><p>GST</p> <p>₹ {taxes}/-</p></div> */}
                  <div className="sum_flex bottom_fix"><b>Total Amount</b> <b>₹ {total}/-</b></div>
                  <p className="save_line">You will save ₹{totalDiscountedAmount} on this order</p>
                </div>
                <button className="btn proc_pay" onClick={() => handleAddTab()}>PLACE ORDER <i class="uil uil-angle-double-right"></i></button>
              </div>
            </>

          )}
        </div>

      }



      <Footer />
    </>
  );
}

export default Cart;
