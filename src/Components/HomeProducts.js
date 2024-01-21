import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import CardSkeleton from "./CardSkeleton";
import Cart from "./Cart";

function HomeProducts(props) {
  const [product, setProduct] = useState([]);
  const [isLoading, setLoading] = useState(true)
  const [cart, setCart] = useState([]);
 
  useEffect(() => {
    axios.get(`${props.api}`).then((response) => {
      setProduct(response.data);
      setLoading(false)
      // console.log(product);
    });
  }, []);

  
  const addToCart = (item) => {
    setCart([...cart, item]);
    console.log(item)
  };

  const removeFromCart = (item) => {
    setCart(cart.filter((i) => i !== item));
  };

  console.log(cart);

  // let priceData = ;

  return (
    <div>
{/* <!-- Modal --> */}
<div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">You're Cart</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
      <Cart cart={cart} />
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary">Close</button>
        <button type="button" class="btn btn-success">Buy Now</button>
      </div>
    </div>
  </div>
</div>
      <div className="container homeproducts flex-column d-flex justify-content-center align-items-center">
      {/* <Cart cart={cart} /> */}
      {/* <h3>Cart</h3>
      <ul>
        {cart.map((item) => (
          <li>{item.Cname} ({item.Cprice} €)</li>
        ))}
      </ul> */}

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
                          <span className="btn btn-secondary"   data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={() => addToCart(item)}>Add to Cart</span>
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
