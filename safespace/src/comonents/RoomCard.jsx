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
      className="bg-white shadow-md rounded-lg overflow-hidden cursor-pointer hover:shadow-lg transition duration-300 ease-in-out"
      onClick={clickHandler}
    >
      {/* Room Image */}
      <img src={images[0]} alt={title} className="w-full h-40 object-cover" />

      {/* Room Info */}
      <div className="p-4">
        <h2 className="text-xl font-semibold mb-2">{title}</h2>
        <p className="text-gray-600 mb-2">{description}</p>
        <p className="text-gray-600 mb-1">
          {location}, {city}, {zipCode}
        </p>
        <p className="text-gray-600 mb-2">Rent: ${rent}/month</p>
        <p className="text-gray-600 mb-2">Beds: {beds}</p>
        <p className="text-gray-600 mb-4">Landlord: {landlord}</p>

        {/* Button */}
      </div>
    </div>
  );
};

export default RoomCard;
