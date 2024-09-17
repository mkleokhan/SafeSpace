import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import RoomCard from "../comonents/RoomCard"; // Assuming RoomCard component is already built
import SideNav from "../comonents/SideNav";
import {
  getAuth,
  isSignInWithEmailLink,
  signInWithEmailLink,
} from "firebase/auth"; // Firebase imports

const Home = () => {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const tenant = useSelector((state) => state.auth.tenantData);
   // Access tenantData from Redux store
  const navigate = useNavigate();

  useEffect(() => {
    // Handle sign-in with email link if the URL contains the sign-in link parameters
    const handleSignInWithEmailLink = async () => {
      const url = window.location.href;
      const auth = getAuth();

      if (isSignInWithEmailLink(auth, url)) {
        let email = window.localStorage.getItem("emailForSignIn");
        if (!email) {
          email = window.prompt("Please provide your email for confirmation");
        }

        try {
          await signInWithEmailLink(auth, email, url);
          window.localStorage.removeItem("emailForSignIn");
          console.log("Sign-in successful!");
        } catch (error) {
          console.error("Error signing in with email link:", error);
          setError("Sign-in failed. Please try again.");
        }
      }
    };

    handleSignInWithEmailLink();
  }, [navigate]);

  // Fetch data from the server
  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:5000/rooms/allrooms");
      console.log("response data:\n", response.data);
      setRooms(response.data);
    } catch (error) {
      console.log(error);
      setError("Failed to fetch rooms.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="flex">
      {/* Conditional Sidebar for Tenants */}
      {tenant && <SideNav />}

      {/* Main Content */}
      <div className="flex-1 px-28 py-6">
        {/* Conditionally render welcome message if the user is a tenant */}
        {tenant && tenant.name ? (
          <h1 className="font-bold text-3xl">Welcome {tenant.name}</h1>
        ) : (
          <h1 className="font-bold text-3xl">Welcome to SafeSpace</h1>
        )}

        {/* Loading and Error Handling */}
        {loading && <p>Loading rooms...</p>}
        {error && <p className="error">{error}</p>}

        {/* Room Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-8">
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
    </div>
  );
};

export default Home;
