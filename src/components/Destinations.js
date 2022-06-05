import React from "react";
import image1 from "../assets/image-1.jpg";
import image2 from "../assets/image-2.jpg";
import image3 from "../assets/image-3.jpg";
import image4 from "../assets/image-4.jpg";
import image5 from "../assets/image-5.jpg";
import image6 from "../assets/image-6.jpg";

const Destinations = () => {
  return (
    <section className="destinations">
      <h3>Our Business Advisors</h3>
      <div className="grid">
        <div>
          <img src={image1} alt="destination-1" />
          <h3>Ram Charan</h3>
          <p>
            Ram Charan is an Indian-American business consultant, speaker, and
            writer resident in Dallas, Texas.
          </p>
        </div>

        <div>
          <img src={image2} alt="destination-2" />
          <h3>Susan Wojcicki</h3>
          <p>
            A humanities major during her Harvard undergrad, Susan Wojcicki
            worked as a management consultant for Bain before Larry Page and
            Sergei Brin started Google from her garage in California. Now she is
            the CEO of Youtube, and was one of Fortune’s ten most powerful Women
            in Business in 2018.
          </p>
        </div>

        <div>
          <img src={image3} alt="destination-3" />
          <h3>Indra Nooyi</h3>
          <p>
            Indra Nooyi spent time in a variety of industries, including a stint
            as a strategy consultant for BCG, before becoming CEO of Pepsi.
            Pepsi’s sales grew 80% during her leadership, and Indra has won
            numerous awards for her executive leadership and graced Forbes The
            World’s 100 Most Powerful Women list for several years.
          </p>
        </div>
      </div>
      <h3>Our Major Clients</h3>
      <div className="grid">
        <div>
          <img src={image4} alt="destination-1" />
          <h3>Federal Bank</h3>
          <p>
            Federal Bank Limited is a major Indian Private sector bank
            headquartered in Aluva, Kochi. The bank has more than 1,250 branches
            spread across different states in India.
          </p>
        </div>

        <div>
          <img src={image5} alt="destination-2" />
          <h3>South Indian Bank</h3>
          <p>
            South Indian Bank Limited is a major private sector bank
            headquartered at Thrissur in Kerala, India. South Indian Bank has
            924 branches, 4 service branches, 53 extension counters and 20
            Regional Offices spread across India.
          </p>
        </div>

        <div>
          <img src={image6} alt="destination-3" />
          <h3>Bank of Baroda</h3>
          <p>
            Bank of Baroda is an Indian nationalised banking and financial
            services company. It is under the ownership of the Ministry of
            Finance of the government of India.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Destinations;
