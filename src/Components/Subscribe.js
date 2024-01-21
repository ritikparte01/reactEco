import React from 'react'

function Subscribe() {
  return (
    <div>
        <div className="sub-text container d-flex justify-content-between align-item-center">
            <h2>Subscribe for Email Updates. Unsubscribe anytime.</h2>
            <div className="email">
            <input type="email" />
            <button className="btn btn-success py-2 px-5">Submit</button>
            </div>
        </div>
    </div>
  )
}

export default Subscribe