import React from 'react';
import MyButton from '../utils/button';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTruck } from '@fortawesome/free-solid-svg-icons/faTruck';
import { faCheck } from '@fortawesome/free-solid-svg-icons/faCheck';
import { faTimes } from '@fortawesome/free-solid-svg-icons/faTimes';

const ProdInfo = (props) => {
  
  const showProdTags = detail => (
    <div className="product_tags">
      {detail.shipping ? (
        <div className="tag">
          <div>
            <FontAwesomeIcon icon={faTruck} />
          </div>
          <div className="tag_text">
            <div>Delivery</div>
            <div>Available</div>
          </div>
        </div>
      ) : null}

      {detail.available ? (
        <div className="tag">
          <div>
            <FontAwesomeIcon icon={faCheck} />
          </div>
          <div className="tag_text">
            <div>Currently</div>
            <div>In Stock</div>
          </div>
        </div>
      ) : (
        <div className="tag">
          <div>
            <FontAwesomeIcon icon={faTimes} />
          </div>
          <div className="tag_text">
            <div>Currently</div>
            <div>Not In Stock </div>
          </div>
        </div> 
      )}
    </div>
  );

  const showProdActions = (detail) => (
    <div className="product_actions">
      <div className="price">£ { detail.price }</div>
      <div className="cart">
        <MyButton
          type="add_to_cart_link"
          runAction={()=>{
            props.addToCart(detail._id)
          }}
        />
      </div>
    </div>
  )

  const showProdSpecifications = (detail) => (
    <div className="product_specifications">
      <h2>Info</h2>
      <div>
        <div className="item">
          <strong>Type:</strong> {detail.type.name}
        </div>
        <div className="item">
          <strong>Size:</strong> {detail.size}ml
        </div>
      </div>
      
    </div>
  )

  const detail = props.detail;
  return (
    <div>
      <h1>
        {detail.brand.name} {detail.name}
      </h1>
      <p>{detail.description}</p>
      {showProdTags(detail)}
      {showProdActions(detail)}
      {showProdSpecifications(detail)}
    </div>
  );
};

export default ProdInfo;