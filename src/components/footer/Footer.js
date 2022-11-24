import React from 'react';

const Footer = () => {
    return (
        <div className="text-lg-center ">
            <p className="mt-5 mb-3 h6 text-light">&copy;{(new Date().getFullYear())} EDISON  </p>
        </div>
    );
};

export default Footer;