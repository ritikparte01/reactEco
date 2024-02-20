import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import CardSkeleton from "./CardSkeleton";
import Cart from "./Cart";

function HomeProducts(props) {
  const [product, setProduct] = useState([]);
  const [isLoading, setLoading] = useState(true)
  // const [cart, setCart] = useState([]);
  // const [userId, setUserId] = useState("");
  const [cartItems, setCartItems] = useState([]);
 
  useEffect(() => {
    axios.get(`${props.api}`).then((response) => {
      setProduct(response.data);
      setLoading(false)
      // console.log(product);
    });
  }, []);

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

  const addToCart = (productId) => {
    const productToAdd = product.find((item) => item.id === productId);
  
    // Load existing cart items from local storage
    const existingCartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
  
    if (!existingCartItems.find((item) => item.id === productId)) {
      // Add the new product to existing cart items
      const newCartItems = [...existingCartItems, productToAdd];
      setCartItems(newCartItems);
      localStorage.setItem('cartItems', JSON.stringify(newCartItems));
      console.log('Product added to cart:', productToAdd);
    } else {
      console.log('Product is already in the cart');
    }
  };

  // console.log('Local Cart' ,cartItems) 

  return (
    <div>
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
                  <div className="card p-3 bg-white">
                    <i className="fa fa-apple"></i>
                    <div className="about-product text-center mt-2">
                      <div className="card-img-box">
                        <img src={item.image} />
                      </div>
                      <div className="card-text">
                        <div>
                          <h4 className="item-title">{item.title}</h4>
                          <h6 className="mt-0 text-black-50">
                            {item.category}
                          </h6>
                        </div>

                        <div className="stats mt-3">
                        <div className="d-flex justify-content-between p-price">
                            <span>Product ID</span>
                            <span>{item.id}</span>
                          </div>
                          <div className="d-flex justify-content-between p-price">
                            <span>Price</span>
                            <span>₹ {Math.round(price)}</span>
                          </div>
                          <div className="d-flex justify-content-between p-price">
                            <span>Rating</span>
                            <span>{item.rating.rate}</span>
                          </div>
                          <div className="d-flex justify-content-between p-price">
                            <span>Review Count</span>
                            <span>{item.rating.count}</span>
                          </div>
                        </div>
                        <div className="d-flex justify-content-between total font-weight-bold mt-4">
                          <span className="btn btn-secondary" onClick={() => addToCart(item.id)}>Add to Cart</span>
                          <span className="btn btn-success">Buy Now</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <div className="see-more d-flex justify-content-center mt-5">
          <Link to="/shop" className="btn btn-dark px-5">
            See More
          </Link>
        </div>
      </div>
    </div>
  );
}

export default HomeProducts;
