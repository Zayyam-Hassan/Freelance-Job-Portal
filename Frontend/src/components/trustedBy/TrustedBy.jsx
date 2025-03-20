import React from "react";

const TrustedBy = () => {
  return (
    <div className="bg-gray-100 h-[100px] flex justify-center">
      <div className="max-w-[760px] flex items-center gap-5 text-gray-400 font-medium">
        <span>Trusted by:</span>
        {[
          "https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/apps/facebook2x.188a797.png",
          "https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/apps/google2x.06d74c8.png",
          "https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/apps/netflix2x.887e47e.png",
          "https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/apps/pandg2x.6dc32e4.png",
          "https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/apps/paypal2x.22728be.png",
        ].map((src, index) => (
          <img key={index} src={src} alt="Trusted Brand" className="h-[50px] object-contain transition-transform hover:scale-105" />
        ))}
      </div>
    </div>
  );
};

export default TrustedBy;
