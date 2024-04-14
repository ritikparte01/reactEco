import React from 'react'
import Skeleton from 'react-loading-skeleton'

function CardSkeleton({ cards }) {
  return Array(cards).fill(0).map((item, i) =>
    <div className="card p-3 bg-white mt-5" key={i}>
      <div className="about-product text-center mt-2">
        <div className="card-img-box">
          <Skeleton width={'90%'} height={'90%'} />
        </div>
        <div className="card-text">
          <div>
            <Skeleton count={2} width={'90%'} />
            <h6 className="mt-0 text-black-50">
              <Skeleton className='mt-3' width={'50%'} />
            </h6>
          </div>

          <div className="stats mt-3">
            <div className="d-flex justify-content-between p-price px-3">
              <Skeleton className='mt-2' count={3} width={'80px'} />
              <Skeleton className='mt-2' count={3} width={'80px'} />
            </div>
            <div className="d-flex justify-content-between p-price">
            </div>
            <div className="d-flex justify-content-between p-price">
            </div>
          </div>
          <div className="d-flex justify-content-between total font-weight-bold mt-4 px-3">
            <Skeleton square width={'120px'} height={'35px'} />
            <Skeleton square width={'120px'} height={'35px'} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default CardSkeleton