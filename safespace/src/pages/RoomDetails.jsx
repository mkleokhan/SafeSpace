import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // Carousel styles

const RoomDetails = () => {
  const [room, setRoom] = useState(null); // Use `null` for an initial state
  const { roomId } = useParams();

  const fetchSpecificRoom = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/rooms/allrooms/${roomId}`
      );
      console.log("response data:\n", response.data);
      setRoom(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchSpecificRoom();
  }, [roomId]);

  if (!room) return <div>Loading...</div>; // Display loading text if room is null

  return (
    <div className="p-4 max-w-6xl mx-auto">
      <div className="bg-white shadow-lg rounded-lg overflow-hidden flex flex-col lg:flex-row">
        {/* Carousel for images */}
        <div className="w-full lg:w-1/2">
          <Carousel showThumbs={true} infiniteLoop className="w-full h-full">
            {room.images.map((image, index) => (
              <div key={index} className="w-full h-full">
                <img
                  src={image}
                  alt={`Room ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </Carousel>
        </div>

        {/* Room details */}
        <div className="p-6 w-full lg:w-1/2">
          <h1 className="text-2xl font-bold mb-2">{room.title}</h1>
          <p className="text-gray-700 mb-4">{room.description}</p>
          <p className="text-gray-600 mb-2">
            Location: {room.location.address}, {room.city}, {room.zipCode}
          </p>
          <p className="text-gray-600 mb-2">
            Rent per Month: ${room.rentPerMonth}
          </p>
          <p className="text-gray-600 mb-2">Beds: {room.beds}</p>
          <p className="text-gray-600 mb-4">Landlord: {room.landlord.name}</p>
        </div>
      </div>
    </div>
  );
};

export default RoomDetails;
