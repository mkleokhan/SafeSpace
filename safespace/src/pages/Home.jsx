import axios from "axios";
import { useState, useEffect } from "react";
import RoomCard from "../comonents/RoomCard";
import { useNavigate } from "react-router-dom";
import {
  getAuth,
  isSignInWithEmailLink,
  signInWithEmailLink,
} from "firebase/auth";
// import { auth } from "../../firebase/firebase"; // Import your Firebase auth configuration

const Home = () => {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Handle sign-in with email link if the URL contains the sign-in link parameters
    const handleSignInWithEmailLink = async () => {
      const url = window.location.href;
      const auth = getAuth();

      if (isSignInWithEmailLink(auth, url)) {
        // Retrieve the email from localStorage or prompt user for it
        let email = window.localStorage.getItem("emailForSignIn");
        if (!email) {
          email = window.prompt("Please provide your email for confirmation");
        }

        try {
          await signInWithEmailLink(auth, email, url);
          // Clear email from localStorage
          window.localStorage.removeItem("emailForSignIn");
          console.log("Sign-in successful!");
          // Optionally, navigate to a different page after successful sign-in
          // navigate("/postroom");
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
    <div className="px-28 py-6">
      {loading && <p>Loading rooms...</p>}
      {error && <p className="error">{error}</p>}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {rooms.map((room) => {
          // Parse images if they are in stringified JSON format
          // const parsedImages = JSON.parse(room.images);

          return (
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
              images={room.images} // Use parsed images here
              clickHandler={() => {
                navigate(`/room-details/${room._id}`);
              }}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Home;
