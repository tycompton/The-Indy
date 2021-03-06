import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCompass } from '@fortawesome/free-solid-svg-icons/faCompass';
import { faPhone } from '@fortawesome/free-solid-svg-icons/faPhone';
import { faClock } from '@fortawesome/free-solid-svg-icons/faClock';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons/faEnvelope';
 
const Footer = ({data}) => {
  return (  
    data.siteData ? 
    <footer className="bck_b_dark">
      <div className="container"> 
        <div className="logo">
          The Independent
        </div> 
        <div className="wrapper">
          <div className="site_info">
            <h2>Contact Information</h2> 
            <div className="business_nfo">
              <div className="tag">
                <FontAwesomeIcon 
                  icon={faCompass}
                  className="icon"
                />
                <div className="nfo">
                  <div>{data.siteData[0].address}</div>
                </div>
              </div>

              <div className="tag">
                <FontAwesomeIcon 
                  icon={faPhone}
                  className="icon"
                />
                <div className="nfo">
                  <div>Telephone:</div>
                  <div>{data.siteData[0].telephone}</div>
                </div>
              </div>

              <div className="tag">
                <FontAwesomeIcon 
                  icon={faClock}
                  className="icon"
                />
                <div className="nfo">
                <div>{data.siteData[0].hours}</div>
                </div>
              </div>

              <div className="tag">
                <FontAwesomeIcon 
                  icon={faEnvelope}
                  className="icon"
                />
                <div className="nfo">
                  <div>Email:</div>
                  <div>{data.siteData[0].email}</div>
                </div>
              </div>



            </div>
          </div>
          <div className="delivery_info">
            <h2>Delivery Areas</h2>
            <p>Brighton: £30 minimum order</p>
            <p>Hove: £40 minimum order</p>
            <p>Please contact us for other areas</p>
          </div>
        </div>
      </div>
    </footer>
    :null
  );
};

export default Footer;  