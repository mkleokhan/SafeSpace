import React from "react";

const RoomCard = ({
  title,
  description,
  location,
  city,
  zipCode,
  rent,
  beds,
  landlord,
  images,
  clickHandler,
}) => {
  return (
    <div
      className="bg-white shadow-md rounded-lg overflow-hidden cursor-pointer hover:shadow-lg transition duration-300 ease-in-out flex flex-col"
      onClick={clickHandler}
    >
      {/* Room Image */}
      <img src={images[0]} alt={title} className="w-full h-40 object-cover" />

      {/* Room Info */}
      <div className="p-4 flex-1 flex flex-col">
        <h2 className="text-xl font-semibold mb-2 truncate">{title}</h2>
        <p className="text-gray-600 mb-2 truncate">{description}</p>
        <p className="text-gray-600 mb-1 truncate">
          {location}, {city}, {zipCode}
        </p>
        <p className="text-gray-600 mb-2">
          <b>Rent:</b> ${rent}/month
        </p>
        <p className="text-gray-600 mb-2">
          <b>Beds:</b> {beds}
        </p>
        <p className="text-gray-600 mb-4 truncate">
          <b>Landlord:</b> {landlord}
        </p>

        {/* Button */}
      </div>
    </div>
  );
};

export default RoomCard;
