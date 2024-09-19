import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import RoomCard from "../comonents/RoomCard"; // Assuming RoomCard component is already built

const Home = () => {
  const [rooms, setRooms] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [keywords, setKeyWords] = useState([]);
  const [loading, setLoading] = useState(true);

  const [error, setError] = useState(null);
  const tenant = useSelector((state) => state.auth.tenantData);
  // Access tenantData from Redux store
  const navigate = useNavigate();

  // Fetch data from the server
  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:5000/rooms/allrooms");
      console.log("response data:\n", response.data);
      setRooms(response.data);
      setSearchResults(response.data);
    } catch (error) {
      console.log(error);
      setError("Failed to fetch rooms.");
    } finally {
      setLoading(false);
    }
  };

  const hanldeSearch = (e) => {
    // alert("clicked....");
    console.log(e.target.value);
    const results = rooms.filter((room) => {
      if (
        room.title.toLowerCase().includes(e.target.value.toLowerCase()) ||
        room.description.toLowerCase().includes(e.target.value.toLowerCase()) ||
        room.location.city.toLowerCase().includes(e.target.value.toLowerCase())
      ) {
        return true;
      }
    });
    setSearchResults(results);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <input
        type="text"
        placeholder="Search for rooms..."
        onChange={hanldeSearch}
        className="w-full mt-8 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      {/* Loading and Error Handling */}
      {loading && <p>Loading rooms...</p>}
      {error && <p className="error">{error}</p>}

      {/* Room Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-8">
        {searchResults.map((room) => (
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
        ))}{" "}
      </div>
    </>
  );
};

export default Home;
