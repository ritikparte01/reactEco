import React from 'react'
import HomeProducts from './HomeProducts'

function Shop() {
  return (
    <div>
        <HomeProducts api={"https://fakestoreapi.com/products?"} />
    </div>
  )
}

export default Shop