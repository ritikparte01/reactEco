import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';


function ConfirmationLs({ tokencode, setTokenCode }) {
  const [userName, setUserName] = useState("");
  const [userId, setUserId] = useState("");
  const [singleProduct, setSingleProduct] = useState("");
  const [prodID, setProdID] = useState("");
  const [singlePrice, setSinglePrice] = useState("");
  const [DiscountedPrice, setDiscountedPrice] = useState("");
  const [discount, setDiscount] = useState("");
  const [checkBlankId, setCheckBlankId] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [cartPrice, setCartPrice] = useState([]);
  // const [subTotal ,setSubTotal] = useState("");


  const localToken = localStorage.getItem('userToken');

//   useEffect(() => {
//     setProdID(localStorage.getItem('buyBtnID'));
//       setCheckBlankId(true);
//   }, [])
  
//   console.log('PROD ID DEL FOR CART',checkBlankId)
//   console.log(prodID);

  useEffect(() => {
    axios({
      method: 'GET',
      url: 'https://api.escuelajs.co/api/v1/auth/profile',
      headers: {
        Authorization: `Bearer ${localToken}`,
      }
    }).then((res) => {
      console.log('Auth log', res);
      setUserName(res.data.name);
      setUserId(res.data.id);
    })
  }, [tokencode])

  useEffect(() => {
    if (prodID) {
      axios.get(`https://api.escuelajs.co/api/v1/products/${prodID}`)
        .then(response => {
          setSingleProduct(response.data);
          console.log("Single Product:", response.data);
        //   setSinglePrice(response.data.price * 10);
          console.log(singlePrice, 'Single Price 10');
        })
        .catch(error => {
          console.error("Error fetching product:", error);
        });
    }
  }, [prodID]);

  useEffect(() => {
    setDiscount(singlePrice / 100 * 20)
    setDiscountedPrice(singlePrice - discount);
    
    console.log('Cart Price New', DiscountedPrice);
  })

  const deliveryCharges = 350;
  // const taxes = 185;
  const total = singlePrice - discount + deliveryCharges;

  const currentDate = new Date();

  // Add 4 days to the current date
  const expectedDate = new Date(currentDate);
  expectedDate.setDate(currentDate.getDate() + 4);

  // Get day, month, and year for current date
  const currentDay = currentDate.getDate().toString().padStart(2, '0'); // Add leading zero if needed
  const currentMonth = (currentDate.getMonth() + 1).toString().padStart(2, '0'); // Add leading zero if needed
  const currentYear = currentDate.getFullYear().toString(); // Get full year

  // Get day, month, and year for expected date
  const expectedDay = expectedDate.getDate().toString().padStart(2, '0'); // Add leading zero if needed
  const expectedMonth = (expectedDate.getMonth() + 1).toString().padStart(2, '0'); // Add leading zero if needed
  const expectedYear = expectedDate.getFullYear().toString(); // Get full year

  // Concatenate day, month, and year to get the desired format
  const formattedCurrentDate = `${currentDay} / ${currentMonth} / ${currentYear}`;
  const formattedExpectedDate = `${expectedDay} / ${expectedMonth} / ${expectedYear}`;

  // const history = useNavigate(); console.log(history.location.state.from);


  useEffect((userId) => {
    const storedCartItems = localStorage.getItem(`cartItems_1`);
    if (storedCartItems) {
      setCartItems(JSON.parse(storedCartItems));
      setSinglePrice(cartItems * 10);
      // setCartPrice(storedCartItems.price);
    console.log('SORTED CART',storedCartItems);
    }
  }, []);

  console.log('CONF CART', cartItems);

  const singlepriceArray = cartItems.map((item) => item.price * 10);


  const subTotal = singlepriceArray.reduce((sum, item) => sum + item);

  const discountArray = cartItems.map((item) => (item.price * 20) / 10 )

  // const discountArray = cartItems.map((item) => {
  //  const tenPrice =  (item.price * 20)/10;
  //  console.log('tenP', tenPrice);

  // });

  console.log('disArray', discountArray);
console.log('subt', subTotal);

  console.log('single p array' ,singlepriceArray);

  return (
    <div className='container'>

      <section class="h-100 gradient-custom">
        <div class="container py-5 h-100">
          <div class="row d-flex justify-content-center align-items-center h-100">
            <div class="col-lg-10 col-xl-12">
              <div class="card_order_main" style={{ borderRadius: "5px" }}>
                <div class="card-header px-4 py-5">
                  <h5 class="text-black mb-0">Thanks for your Order, <span style={{ color: "orangered" }}>{userName}</span>!</h5>
                </div>
                <div class="card-body p-4">
                  <div class="d-flex justify-content-between align-items-center mb-4">
                    <p class="lead fw-normal mb-0" style={{ color: "orangered" }}>Receipt</p>
                    <p class="small text-muted mb-0">Receipt Voucher : 1KAU9-84UIL</p>
                  </div>
                  <div class="card_order shadow-0 border mb-4">
                    <div class="card-body">
                      <div>
                    {cartItems.map((item) => (
                     <div class="row mb-2 border-bottom pb-2">
                     <div class="col-md-2">
                       {item?.images?.length > 0 && <img className="img-fluid" src={item.images[0]} alt="Product" />}
                     </div>
                     <div class="col-md-2 text-center d-flex justify-content-center align-items-center">
                       <p class="text-muted mb-0">{item.title}</p>
                     </div>
                     <div class="col-md-2 text-center d-flex justify-content-center align-items-center">
                       <p class="text-muted mb-0 small">{item?.category?.name}</p>
                     </div>
                     <div class="col-md-2 text-center d-flex justify-content-center align-items-center">
                       <p class="text-muted mb-0 small">Size: </p>
                     </div>
                     <div class="col-md-2 text-center d-flex justify-content-center align-items-center">
                       <p class="text-muted mb-0 small">Qty: 1</p>
                     </div>
                     <div class="col-md-2 text-center d-flex justify-content-center align-items-center">
                       {/* <p class="text-muted mb-0 small">₹ {(item.price * 10)/100 }</p> */}
                       <p class="text-muted orange_font mb-0 small"><del className="text-dashed"> ₹ {item.price * 10}</del> ₹ {`${item.price * 10}` - `${(item.price * 10) * 20 / 100}`} /-</p>
                     </div>
                   </div>
                    ))}
                      </div>
                
                      <div class="row d-flex align-items-center pt-3">
                        <div class="col-md-2">
                          <p class="text-black fw-bold mb-0 small">Track Order</p>
                        </div>
                        <div class="col-md-10">
                          <div class="progress" style={{ height: "6px", borderRadius: "16px" }}>
                            <div class="progress-bar" role="progressbar"
                              style={{ width: "5%", borderRadius: "16px", backgroundColor: "orangered" }} aria-valuenow="65"
                              aria-valuemin="0" aria-valuemax="100"></div>
                          </div>
                          <div class="d-flex justify-content-between mb-1">
                            <p class="text-muted mt-1 mb-0 small">Order Placed</p>
                            <p class="text-muted mt-1 mb-0 small">Out for delivary</p>
                            <p class="text-muted mt-1 mb-0 small">Delivered</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="d-flex justify-content-between align-items-center">
                    <h3 className="mx-0 my-2">Expected Delivery Date : <span className="orange_text">{formattedExpectedDate}</span></h3>
                  </div>

                  <div class="d-flex justify-content-between pt-2">
                    <p class="fw-bold mb-0">Order Details</p>
                    <p class="text-black mb-0"><span class="fw-bold me-4">Price</span> ₹ {subTotal} /-</p>
                  </div>

                  <div class="d-flex justify-content-between pt-2">
                    <p class="text-muted mb-0">Invoice Number : 788152</p>
                    <p class="text-black mb-0"><span class="fw-bold me-4">Discount</span> ₹ {discount}</p>
                  </div>

                  {/* <div class="d-flex justify-content-between">
                    <p class="text-muted mb-0">Invoice Date : {formattedCurrentDate}</p>
                    <p class="text-black mb-0"><span class="fw-bold me-4">GST 18%</span>₹ {taxes}</p>
                  </div> */}

                  <div class="d-flex justify-content-between mb-5 pt-2">
                    <p class="text-muted mb-0">Recepits Voucher : 18KU-62IIK</p>
                    <p class="text-black mb-0"><span class="fw-bold me-4">Delivery Charges</span>₹ {deliveryCharges}</p>
                  </div>
                </div>
                <div class="card-footer border-0 px-4 py-5"
                  style={{ backgroundColor: "#ffc107" }}>
                  <h5 class="d-flex align-items-center justify-content-end text-black text-uppercase mb-0 gap-1">Total
                    paid: <span class="h4 mb-0 ms-2">₹ </span>{total.toFixed(2)}</h5>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  )
}

export default ConfirmationLs;