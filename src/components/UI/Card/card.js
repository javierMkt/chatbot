import React from 'react'

/** 
 * @function Card
*/

const Card = (props) => {
  return (
    <div className="card">
        {props.children}
    </div>
  )
}

export default Card