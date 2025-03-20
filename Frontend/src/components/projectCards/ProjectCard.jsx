import React from "react";

const ProjectCard = ({ card }) => {
  return (
    <div className="w-[300px] h-[300px] rounded-md overflow-hidden cursor-pointer border border-gray-200 transition-transform hover:scale-105 ">
      {/* Project Image */}
      <img src={card.img} alt="Project" className="w-full h-[70%] object-cover" />

      {/* User Info */}
      <div className="flex items-center gap-5 p-4">
        {/* Profile Picture */}
        <img src={card.pp} alt={card.username} className="w-10 h-10 rounded-full object-cover" />

        {/* Text Details */}
        <div className="flex flex-col">
          <h2 className="text-sm font-semibold">{card.cat}</h2>
          <span className="text-sm text-gray-500">{card.username}</span>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
