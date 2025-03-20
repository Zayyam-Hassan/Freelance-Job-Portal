import React from "react";
import { Link } from "react-router-dom";

const CatCard = ({ card }) => {
  return (
    <Link to="/gigs?cat=design">
      <div className="relative w-[252px] h-[344px] text-white rounded-lg cursor-pointer overflow-hidden transition-transform hover:scale-105">
        <img src={card.img} alt={card.title} className="w-full h-full object-cover" />
        <span className="absolute top-4 left-4 text-sm font-light">{card.desc}</span>
        <span className="absolute top-10 left-4 text-2xl font-semibold">{card.title}</span>
      </div>
    </Link>
  );
};

export default CatCard;
