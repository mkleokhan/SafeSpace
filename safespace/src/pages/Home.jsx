import axios from "axios";
import { useState, useEffect } from "react";
import RoomCard from "../comonents/RoomCard";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [rooms, setRooms] = useState([]);
  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:5000/rooms/allrooms");
      console.log("response data:\n", response.data);
      setRooms(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  console.log("Rooms: \n", rooms);

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="px-28 py-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {rooms.map((room) => (
         
          <RoomCard
            key={room._id}
            title={room.title}
            description={room.description}
            location={room.location.address}
            city={room.location.city}
            zipCode={room.location.zipCode}
            rent={room.rentPerMonth}
            beds={room.beds}
            landlord={room.landlord.name}
            images={room.images}
            clickHandler={() => {
              navigate(`/room-details/${room._id}`);
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default Home;
