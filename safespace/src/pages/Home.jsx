import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import RoomCard from "../comonents/RoomCard"; // Assuming RoomCard component is already built
import SideNav from "../comonents/SideNav";
import AllRooms from "../comonents/AllRooms";

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
      <div className="flex">
        {/* Conditional Sidebar for Tenants */}
        {tenant && <SideNav />}

        {/* Main Content */}
        <div className="flex-1 px-28 py-6">
          {/* Conditionally render welcome message if the user is a tenant */}
          {tenant && tenant.name ? (
            <>
              {" "}
              <h1 className="font-bold text-3xl">Welcome {tenant.name}</h1>
            </>
          ) : (
            <h1 className="font-bold text-3xl">
              Welcome to SafeSpace - Where Comfort Meets Security!
            </h1>
          )}

          {/* Loading and Error Handling */}
          {loading && <p>Loading rooms...</p>}
          {error && <p className="error">{error}</p>}

          <AllRooms />
        </div>
      </div>
    </>
  );
};

export default Home;
