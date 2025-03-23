import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faHeart } from "@fortawesome/free-solid-svg-icons";

const GigCard = (props) => {
  return (
    <Link to={`/gig/${props.item._id}`} className="no-underline">
      <div className="w-full max-w-xs bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-transform transform hover:-translate-y-1">
        <img
          src={props.item.coverimage}
          className="w-full h-44 object-cover"
          alt="Gig Image"
        />

        <div className="p-4">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center">
              <img
                src={props.item.freelancer_id.full_verification[0].profile_pic}
                alt="User"
                className="w-8 h-8 rounded-full object-cover"
              />
              <span className="ml-2 font-bold">
                {props.item.freelancer_id.full_verification[0].full_name}
              </span>
            </div>
            <span className="text-gray-500 text-sm font-medium">Level: 2</span>
          </div>

          <p className="text-gray-600 text-sm truncate">
            {props.item.description}
          </p>

          <div className="flex items-center mt-2">
            <FontAwesomeIcon icon={faStar} className="text-yellow-500 mr-1" />
            <span className="font-bold text-yellow-500">{props.item.reviews.rating}</span>
          </div>

          <hr className="border-gray-200 my-3" />

          <div className="flex justify-between items-center">
            <FontAwesomeIcon
              icon={faHeart}
              className="text-red-400 cursor-pointer text-lg hover:text-red-600 transition-colors"
            />

            <div className="text-right">
              <span className="text-gray-500 text-xs">Starting at</span>
              <h5 className="text-lg font-bold text-black">
                ${props.item.price}
              </h5>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default GigCard;
