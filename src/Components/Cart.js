
import React, { useEffect, useState } from "react";
import axios from "axios";

function Cart(props) {
  const [userId, setUserId] = useState("");
  const [cart, setCart] = useState([]);
  const [idProd, setIdProd] = useState([]);
  const [cartIdProd, setCartIdProd] = useState([]);
  // const total = cart.reduce((acc, item) => acc + item.price, 0);

  console.log('LOCAL TOKEN', localStorage.getItem('userToken'))

  const localToken = localStorage.getItem('userToken');

  useEffect(() => {
      axios({
        method: 'GET',
        url: 'https://api.escuelajs.co/api/v1/auth/profile',
        headers:{
          Authorization: `Bearer ${localToken}`,
        }
      }).then((res)=>{
        console.log('Auth log',res);
        console.log('user id',userId);
        setUserId(res.data.id);
      }).catch((err) =>{ console.log('Err',err)})
  }, [localToken])

  useEffect(() => {
    axios.get(`https://fakestoreapi.com/carts/user/41`).then((response) => {
      // setCart(response.data);
      setCartIdProd(response.data);
      console.log('cartIdProd', cartIdProd);
      // setLoading(false)  
      // console.log('User Dynamic Cart', cart);
    });
  }, []);

  
    // useEffect(() => {
    //   axios.get(`https://fakestoreapi.com/products/${cartIdProd}`).then((response) => {
    //     console.log('Prod ID sent')
    //     setIdProd(response.data);
    //     // setLoading(false)  
    //     console.log('Prod from id1', idProd);
    //   });
    // }, [cartIdProd]);




  return (
    <div>
    <h1>Your Cart</h1>
    {cartIdProd.map((item) => {
    <p>{item.title}</p>
    })}
  </div>
  );
}

export default Cart;
