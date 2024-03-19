import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import CardSkeleton from "./CardSkeleton";
import Cart from "./Cart";
import { Toaster, toast } from 'sonner'
import Footer from "./Footer";
import { useNavigate  } from 'react-router-dom';



function HomeProducts(props) {
  const [product, setProduct] = useState([]);
  const [isLoading, setLoading] = useState(true)
  // const [cart, setCart] = useState([]);
  // const [userId, setUserId] = useState("");
  const [cartItems, setCartItems] = useState([]);
  const [seeMore, setSeeMore] = useState(true);

  useEffect(() => {
    axios.get(`${props.api}`).then((response) => {
      setProduct(response.data);
      setLoading(false)
      console.log(product);
    });
  }, []);

  useEffect(() => {
    const currUrl = window.location.href;
    console.log(currUrl);
    if (currUrl.includes('/shop')) {
      setSeeMore(false);
      window.scrollTo(0, 0);
    }
  }, []);

  const defaultImageUrl = 'https://digiday.com/wp-content/uploads/sites/3/2021/11/blockchain-broken-gif.gif?w=1030&h=579&crop=1';
  const handleImageError = (event) => {
    event.target.src = defaultImageUrl;
  };

  let navigate = useNavigate();

  const buyBtn = (productId) => { 
    // const buyBtnID = '';
     console.log(productId, 'ID BUY');
     localStorage.setItem('buyBtnID', productId);
     navigate('/detail');
    window.scrollTo(0, 0);
  }

  // console.log('LOCAL TOKEN', localStorage.getItem('userToken'))

  // const localToken = localStorage.getItem('userToken');

  // TOKEN VALIDATION DND -----
  // useEffect(() => {
  //     axios({
  //       method: 'GET',
  //       url: 'https://api.escuelajs.co/api/v1/auth/profile',
  //       headers:{
  //         Authorization: `Bearer ${localToken}`,
  //       }
  //     }).then((res)=>{
  //       console.log('Auth log',res);
  //       setUserId(res.data.id);
  //     })
  // }, [])

  // const addToCart = (productId) =>{
  //     console.log('working add to cart');
  //     axios({
  //       method: 'POST',
  //       url: 'https://fakestoreapi.com/carts',
  //       data: {
  //         userId: `${userId}`,
  //         products:[{productId: productId, quantity:1}],
  //       }
  //     }).then((res)=>{
  //       console.log(`POST SUCC PRO ON USER ${userId}`, res);
  //     }).catch((err)=>{
  //       console.log(err.res);
  //     })
  //   }

  // let priceData = ;

const addToCart = (productId, userId) => {
  const productToAdd = product.find((item) => item.id === productId);

  // Retrieve cart items for the specific user from local storage
  const userCartKey = `cartItems_${userId}`;
  const existingCartItems = JSON.parse(localStorage.getItem(userCartKey)) || [];

  if (!existingCartItems.find((item) => item.id === productId)) {
    const newCartItems = [...existingCartItems, productToAdd];
    setCartItems(newCartItems);

    // Save cart items for the specific user in local storage
    localStorage.setItem(userCartKey, JSON.stringify(newCartItems));

    console.log('Product added to cart:', productToAdd);
    toast.success('Product Added in Cart');
  } else {
    console.log('Product is already in the cart');
    toast.error('Product is Already in the Cart');
  }
};

  // console.log('Local Cart' ,cartItems) 

  return (
    <>
      <div className="home_per">
        <Toaster position="top-right" richColors closeButton />
        <div className="container homeproducts flex-column d-flex justify-content-center align-items-center">
          <h1 className="heading">
            Recent <span>Launched </span>
          </h1>
          <div className="main-card">
            {isLoading && <CardSkeleton cards={20} />}
            {product.map((item) => {
              let price = item.price * 81;
              return (
                <div>
                  <div className="row mt-5">
                    {/* <div className="card p-3 bg-white">
                      <i className="fa fa-apple"></i>
                      <div className="about-product text-center mt-2">
                        <div className="card_div"  onClick={() => buyBtn(item.id)}>
                        <div className="card-img-box">
                          <img src={item.images} onError={handleImageError} />
                        </div>
                        <div className="card-text">
                          <div>
                            <h4 className="item-title">{item.title}</h4>
                            <h6 className="mt-0 text-black-50">
                              {item.category.name}
                            </h6>
                          </div>

                          <div className="stats mt-3">
                            <div className="d-flex justify-content-between p-price">
                              <span>Product ID</span>
                              <span>{item.id}</span>
                            </div>
                            <div className="d-flex justify-content-between p-price">
                              <span>Price</span>
                              <span>₹ {item.price * 10}</span>
                            </div>
                            <div className="d-flex justify-content-between p-price">
                              <span>Updated At</span>
                              <span>{item.updatedAt}</span>
                            </div>
                          </div>
                          </div>
                      
                        </div>
                        <div className="d-flex justify-content-between total font-weight-bold mt-4">
                            <span className="btn btn-success">  <i class="uil uil-heart"></i></span>
                            <span className="btn btn-dark" onClick={() => addToCart(item.id)}>Add to Cart</span>
                          
                          </div>
                      </div>
                    </div> */}

                    <div className="new_card">
                    <div className="card-img-box"  onClick={() => buyBtn(item.id)}>
                          <img src={item.images} onError={handleImageError} />
                        </div>

                        <div className="backdrop">
                        <h6 className="item-title">{item.title}</h6>
                        <p className="desc_line">{item.description}</p>
                        </div>

                        <div className="d-flex justify-content-between total font-weight-bold my-4 px-3">
                            <span className="btn btn-light text-black cust_shadow">  <i class="uil uil-heart"></i> Wishlist</span>
                            <span className="btn btn-success cust_shadow" onClick={() => addToCart(item.id)}>Add to Cart</span>
                          
                          </div>
                    </div>









                  </div>
                </div>
              );
            })}
          </div>
          {seeMore ?
            <div className="see-more d-flex justify-content-center mt-5">
              <Link to="/shop" className="btn btn-dark px-5">
                See More
              </Link>
            </div>
            : ''
          }

        </div>
      </div>
      {seeMore ? '' :
      <Footer />
        }
    </>
  );
}

export default HomeProducts;
