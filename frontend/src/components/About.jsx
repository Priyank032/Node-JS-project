import React from "react";

const About = () => {
  return (
    <div>
      <section id="about">
        <div className="container my-5 py-5">
          <div className="row">
            <div className="col-md-6">
              <img src="/assets/about1.jpg" alt="About" className="w-75 mt-5" />
            </div>
            <div className="col-md-6">
              <h3 className="fs-5 mb-0">About Us</h3>
              <h1 className="display-6 mb-2">
                Who<b>We</b>Are
              </h1>
              <h1 className="display-6 mb-2">
                Signal is an web-application developed and owned by Praedico
                Global Research Pvt. Ltd.
              </h1>
              <hr className="w-50" />
              <p className="lead mb-4">
                Presenting neural portfolio building platform .This platform
                designs tailor made portfolios for the user taking input neural
                from users with there risk profiling and matching it with the
                intrinsic neural of the stocks which leads to portfolio being
                built with accurate RIME(Risk Modulation efficiency). World over
                investment products are designed with the TOP-DOWN methodology
                in which first the investment portfolio is made and then
                investors selects the portfolio suited for him/her .But with
                Praedicoss neural portfolio first time BOTTOM-UP approach is
                being introduced to the investors world over where investors can
                input their investment goals and then portfolio is designed. We
                proudly present "Neural Portfolio Assist" which builds more than
                10 Billion unique portfolios with the help of artificial
                intelligence taking right customer risk profiling into
                consideration.
              </p>
              <button className="btn btn-primary rounded-pill px-4 py-2">
                Get Started
              </button>
              <button className="btn btn-outline-primary rounded-pill px-4 py-2 ms-2">
                Contact Us
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
