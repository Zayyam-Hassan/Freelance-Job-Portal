import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import Featured from "../../components/featured/Featured";
import TrustedBy from "../../components/trustedBy/TrustedBy";
import Slide from "../../components/slider/Slider";
import CatCard from "../../components/catCard/CatCard";
import ProjectCard from "../../components/projectCards/ProjectCard";
import { cards, projects } from "../../data";

const Home = () => {
  return (
    <div className="home">
      <Featured />
      <TrustedBy />

      {/* Category Slide Section */}
      <Slide slidesToShow={5} arrowsScroll={5}>
        {cards.map((card) => (
          <CatCard key={card.id} card={card} />
        ))}
      </Slide>

      {/* Features Section */}
      <div className="bg-green-50 flex justify-center py-20">
        <div className="max-w-6xl flex items-center gap-20 px-5 md:px-10">
          <div className="flex-1 space-y-5">
            <h1 className="text-3xl font-semibold">
              A whole world of freelance talent at your fingertips
            </h1>
            {[
              "The best for every budget",
              "Quality work done quickly",
              "Protected payments, every time",
              "24/7 support",
            ].map((text, index) => (
              <div key={index}>
                <div className="flex items-center gap-3 text-lg font-medium text-gray-700">
                  <FontAwesomeIcon icon={faCheck} className="text-green-500 text-xl" />
                  {text}
                </div>
                <p className="text-gray-600">
                  {index === 0
                    ? "Find high-quality services at every price point. No hourly rates, just project-based pricing."
                    : index === 1
                    ? "Find the right freelancer to begin working on your project within minutes."
                    : index === 2
                    ? "Always know what you'll pay upfront. Your payment isn't released until you approve the work."
                    : "Find high-quality services at every price point. No hourly rates, just project-based pricing."}
                </p>
              </div>
            ))}
          </div>
          <div className="flex-1">
            <video className="w-full rounded-md shadow-md" src="./img/video.mp4" controls />
          </div>
        </div>
      </div>

      {/* Explore Marketplace */}
      <div className="flex justify-center py-20">
        <div className="max-w-6xl w-full px-5">
          <h1 className="text-3xl font-semibold text-gray-700 mb-10">Explore the marketplace</h1>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6">
            {[
              { title: "Graphics & Design", icon: "graphics-design.d32a2f8.svg" },
              { title: "Digital Marketing", icon: "online-marketing.74e221b.svg" },
              { title: "Writing & Translation", icon: "writing-translation.32ebe2e.svg" },
              { title: "Video & Animation", icon: "video-animation.f0d9d71.svg" },
              { title: "Music & Audio", icon: "music-audio.320af20.svg" },
              { title: "Programming & Tech", icon: "programming.9362366.svg" },
              { title: "Business", icon: "business.bbdf319.svg" },
              { title: "Lifestyle", icon: "lifestyle.745b575.svg" },
              { title: "Data", icon: "data.718910f.svg" },
              { title: "Photography", icon: "photography.01cf943.svg" },
            ].map(({ title, icon }, index) => (
              <div
                key={index}
                className="flex flex-col items-center justify-center text-center cursor-pointer hover:scale-105 transition transform duration-300"
              >
                <img
                  src={`https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/apps/${icon}`}
                  alt={title}
                  className="w-12 h-12"
                />
                <div className="w-12 h-0.5 bg-gray-300 my-2 transition-all duration-300 group-hover:w-20 group-hover:bg-green-500"></div>
                <span className="text-gray-600">{title}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Business Section */}
      <div className="bg-blue-900 text-white flex justify-center py-20">
        <div className="max-w-6xl flex items-center gap-20 px-5 md:px-10">
          <div className="flex-1 space-y-5">
            <h1 className="text-3xl font-semibold">
              liverr <i className="font-light">business</i>
            </h1>
            <h1 className="text-3xl font-semibold">
              A business solution designed for <i className="font-light">teams</i>
            </h1>
            <p className="text-lg">
              Upgrade to a curated experience packed with tools and benefits, dedicated to businesses
            </p>
            {[
              "Connect to freelancers with proven business experience",
              "Get matched with the perfect talent by a customer success manager",
              "Manage teamwork and boost productivity with one powerful workspace",
            ].map((text, index) => (
              <div key={index} className="flex items-center gap-3 text-lg font-light">
                <FontAwesomeIcon icon={faCheck} className="text-green-500 text-xl" />
                {text}
              </div>
            ))}
            <button className="bg-green-500 hover:bg-green-600 text-white py-2 px-5 rounded-md mt-5">
              Explore Liverr Business
            </button>
          </div>
          <div className="flex-1">
            <img
              className="w-full rounded-md shadow-md"
              src="https://fiverr-res.cloudinary.com/q_auto,f_auto,w_870,dpr_2.0/v1/attachments/generic_asset/asset/d9c17ceebda44764b591a8074a898e63-1599597624768/business-desktop-870-x2.png"
              alt=""
            />
          </div>
        </div>
      </div>

      {/* Projects Slide Section */}
      <Slide slidesToShow={4} arrowsScroll={4} >
        {projects.map((card) => (
          <ProjectCard key={card.id} card={card} />
        ))}
      </Slide>
    </div>
  );
};

export default Home;
