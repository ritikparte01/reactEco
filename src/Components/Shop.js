import React from 'react'
import HomeProducts from './HomeProducts'

function Shop() {
  return (
    <div>
        <HomeProducts api={"https://api.escuelajs.co/api/v1/products"} />
    </div>
  );
}

export default Shop