import React, { useEffect, useState } from "react";
import axios from "axios";
import "./cartCard.css";
import { Player } from '@lottiefiles/react-lottie-player';
import { Toaster, toast } from 'sonner'
import Swal from 'sweetalert2'
import Footer from './Footer';
import up_arrow from '../Imgs/up_arrow.png'
import { useNavigate } from 'react-router-dom';


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
  const [isFormFilled, setIsFormFilled] = useState(false);
  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    address: '',
    phone:'',
    zipcode: '',
    country: '',
    city: '',
    state: '',
  });
  const [errors, setErrors] = useState({});

  useEffect((userId) => {
    // Retrieve cart items from localStorage on component mount
    const storedCartItems = localStorage.getItem(`cartItems_1`);
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
      console.log('Auth log', res.data);
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

  console.log('single p array' ,singlepriceArray);


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
  
  let navigate = useNavigate();

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
        navigate('/confirmationls');
      }
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  };


  // const [total, setTotal] = useState(0);

  const handleProceedToPay = () => {
    loadRazorpayScript();
    // localStorage.removeItem('buyBtnID');
    // localStorage.setItem('confCart', JSON.stringify(updatedCartItems));
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
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Perform form validation here
    // Example validation for required fields
    const newErrors = {};
    if (!formData.firstname) {
      newErrors.firstname = 'Please enter your first name';
    }
    if (!formData.lastname) {
      newErrors.lastname = 'Please enter your last name';
    }
    if (!formData.address) {
      newErrors.address = 'Please enter your address';
    }
    if(!formData.phone){
      newErrors.phone = "Please Enter Your Number";
    }
    if (!formData.zipcode) {
      newErrors.zipcode = 'Please enter your zip code';
    }
    if (!formData.country) {
      newErrors.country = 'Please select your country';
    }
    if (!formData.city) {
      newErrors.city = 'Please enter your city';
    }
    if (!formData.state) {
      newErrors.state = 'Please select your state';
    }
   
    setErrors(newErrors);
    if (Object.keys(newErrors).length === 0) {
      setIsFormFilled(true);
      console.log(isFormFilled, 'FORM FILL');
    }

    

  };
  // const ResetForm = (e) =>{
  //   e.target.value = ""
  // }

  // for payment btn ------------------------------------
  // onClick={() => handleProceedToPay(total.toFixed(2))}

  return (
    <>


      {isAddDetails ?
        <>
          <div className="container back_cart_btn" onClick={() => handleAddTabFalse()}><i className="uil uil-previous"></i> Back to cart</div>
          <div className="container d-flex gap-4 mt-1 pb-5">
            <div className="cartCardPer">
              <div className="form_main">
                <h1>Shipping</h1>
                <p>Please enter your shipping details.</p>
                <hr />
                <form action="" className="form" onSubmit={handleSubmit}>
                  <div className="fields fields--2">
                    <label className="field">
                      <span className="field__label" htmlFor="firstname">First name <p className="red_star">*</p></span>
                      <input className="field__input" type="text" id="firstname" value={formData.firstname} onChange={handleChange} />
                      {errors.firstname && <div className="error_text"><img src={up_arrow} /><span>{errors.firstname}</span></div>}
                    </label>
                    <label className="field">
                      <span className="field__label" htmlFor="lastname">Last name <p className="red_star">*</p></span>
                      <input className="field__input" type="text" id="lastname" value={formData.lastname} onChange={handleChange} />
                      {errors.lastname && <div className="error_text"><img src={up_arrow} /><span>{errors.lastname}</span></div>}
                    </label>
                  </div>
                  <label className="field">
                    <span className="field__label" htmlFor="address">Address <p className="red_star">*</p></span>
                    <input className="field__input" type="text" id="address" value={formData.address} onChange={handleChange} />
                    {errors.address && <div className="error_text"><img src={up_arrow} /><span>{errors.address}</span></div>}
                  </label>
                  <div className="fields fields--2">
                    <label className="field">
                      <span className="field__label" htmlFor="phone">10-Digit Mobile Number <p className="red_star">*</p></span>
                      <input className="field__input" type="text" id="phone" value={formData.phone} onChange={handleChange} />
                      {errors.zipcode && <div className="error_text"><img src={up_arrow} /><span>{errors.phone}</span></div>}
                    </label>
                    <label className="field">
                      <span className="field__label" htmlFor="country">Country <p className="red_star">*</p></span>
                      <select className="field__input" id="country" value={formData.country} onChange={handleChange}>
                        <option value=""></option>
                        <option value="IN">India</option>
                      </select>
                      {errors.country && <div className="error_text"><img src={up_arrow} /><span>{errors.country}</span></div>}
                    </label>
                  </div>
                  <div className="fields fields--3">
                    <label className="field">
                      <span className="field__label" htmlFor="zipcode">Zip code <p className="red_star">*</p></span>
                      <input className="field__input" type="text" id="zipcode" value={formData.zipcode} onChange={handleChange} />
                      {errors.zipcode && <div className="error_text"><img src={up_arrow} /><span>{errors.zipcode}</span></div>}
                    </label>
                    <label className="field">
                      <span className="field__label" htmlFor="city">City <p className="red_star">*</p></span>
                      <input className="field__input" type="text" id="city" value={formData.city} onChange={handleChange} />
                      {errors.city && <div className="error_text"><img src={up_arrow} /><span>{errors.city}</span></div>}
                    </label>
                    <label className="field">
                      <span className="field__label" htmlFor="state">State <p className="red_star">*</p></span>
                      <select className="field__input" id="state" value={formData.state} onChange={handleChange}>
                        <option value=""></option>
                        <option value="SelectState">Select State</option>
                        <option value="Andra Pradesh">Andra Pradesh</option>
                        <option value="Arunachal Pradesh">Arunachal Pradesh</option>
                        <option value="Assam">Assam</option>
                        <option value="Bihar">Bihar</option>
                        <option value="Chhattisgarh">Chhattisgarh</option>
                        <option value="Goa">Goa</option>
                        <option value="Gujarat">Gujarat</option>
                        <option value="Haryana">Haryana</option>
                        <option value="Himachal Pradesh">Himachal Pradesh</option>
                        <option value="Jammu and Kashmir">Jammu and Kashmir</option>
                        <option value="Jharkhand">Jharkhand</option>
                        <option value="Karnataka">Karnataka</option>
                        <option value="Kerala">Kerala</option>
                        <option value="Madya Pradesh">Madya Pradesh</option>
                        <option value="Maharashtra">Maharashtra</option>
                        <option value="Manipur">Manipur</option>
                        <option value="Meghalaya">Meghalaya</option>
                        <option value="Mizoram">Mizoram</option>
                        <option value="Nagaland">Nagaland</option>
                        <option value="Orissa">Orissa</option>
                        <option value="Punjab">Punjab</option>
                        <option value="Rajasthan">Rajasthan</option>
                        <option value="Sikkim">Sikkim</option>
                        <option value="Tamil Nadu">Tamil Nadu</option>
                        <option value="Telangana">Telangana</option>
                        <option value="Tripura">Tripura</option>
                        <option value="Uttaranchal">Uttaranchal</option>
                        <option value="Uttar Pradesh">Uttar Pradesh</option>
                        <option value="West Bengal">West Bengal</option>
                        <option disabled>UNION Territories</option>
                        <option value="Andaman and Nicobar Islands">Andaman and Nicobar Islands</option>
                        <option value="Chandigarh">Chandigarh</option>
                        <option value="Dadar and Nagar Haveli">Dadar and Nagar Haveli</option>
                        <option value="Daman and Diu">Daman and Diu</option>
                        <option value="Delhi">Delhi</option>
                        <option value="Lakshadeep">Lakshadeep</option>
                        <option value="Pondicherry">Pondicherry</option>
                      </select>
                      {errors.state && <div className="error_text"><img src={up_arrow} /><span>{errors.state}</span></div>}
                    </label>
                  </div>
                <button type="submit" className="btn btn-success text-center justify-content-center w-25">Save Address</button>
                {/* <button type="reset" className="button" onClick={() => ResetForm()}>Clear Form</button> */}
                </form>
                <hr />
              </div>
            </div>

            <div className="summ_par">
              <div className='summary'>
                <h3 className="text-left mb-3">PRICE DETAILS</h3>
                <div className="sum_flex"><p>Price <span className="product_cout_link" onClick={() => handleAddTabFalse()}>({productsCount} Products)</span></p> <p>₹ {subtotal}/-</p></div>
                <div className="sum_flex"><p>Discount</p> <p className="text-green">- ₹ {totalDiscountedAmount}/-</p></div>
                <div className="sum_flex"><p>Delivery Charges</p> <p>₹ {deliveryCharges}/-</p></div>
                {/* <div className="sum_flex"><p>GST</p> <p>₹ {taxes}/-</p></div> */}
                <div className="sum_flex bottom_fix"><b>Total Amount</b> <b>₹ {total}/-</b></div>
                <p className="save_line">You will save ₹{totalDiscountedAmount} on this order</p>
              </div>
              <button className={`${isFormFilled ? 'proc_pay btn' : 'proc_pay_dis btn'}`} onClick={isFormFilled ? () => handleProceedToPay(total.toFixed(2)) : null}>PLACE ORDER 2<i className="uil uil-angle-double-right"></i></button>
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
              <p className="text-center display-5">Your Cart is <sapn className="orange_text fw-bolder">Empty!!!</sapn></p>
            </div>
          ) : (
            <>
              <div className="cartCardPer">
                {cartItems.map((item) => (
                  <>
                    <div className="card bg-transparent">
                      {item && item.images && item.images.length > 0 && (
                        <img src={item.images[0]} onError={handleImageError} className="card-img-top" alt={item.title} />
                      )}
                      <div className="card-body">
                        <div className="text-section">
                          <h5 className="card-title">{item.title}</h5>
                          <p className="card-text limit_text">
                            {item.description}
                          </p>



                        </div>
                        <div className="cta-section">

                          <div className="orange_font"> <del className="text-dashed"> ₹ {item.price * 10}</del> ₹ {`${item.price * 10}` - `${(item.price * 10) * 20 / 100}`} /-</div>
                          <a href="#" className="btn remove_btn" onClick={() => removeFromCart(item.id)} >
                            <i className="uil uil-trash-alt"></i>
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
                <button className="btn proc_pay" onClick={() => handleAddTab()}>PLACE ORDER <i className="uil uil-angle-double-right"></i></button>
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
