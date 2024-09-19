import axios from "axios";
import React, { useEffect, useState } from "react";

const Search = () => {
  const [rooms, setRooms] = useState([]);
  const [keywords, setKeyWords] = useState();

  const fetchRooms = async (req, res) => {
    const response = await axios.get("http://localhost:5000/rooms/allrooms");
    setRooms(response.data);

    console.log("rooms in search", rooms);
  };

  const handleSearch = (e) => {
    setKeyWords(e.target.value);
    console.log(keywords);
    const filteredRooms = rooms.filter((room) => {
      return (
        room.title.includes(keywords) ||
        room.description.includes(keywords) ||
        room.location.city.includes(keywords)
      );
    });

    if (filteredRooms.length > 0) {
      setRooms(filteredRooms);
      console.log("rooms after filteration", rooms);
    } else {
      console.log("no rooms found..");
    }
  };

  useEffect(() => {
    fetchRooms();
  }, []);

  return (
    <>
      <input
        type="text"
        placeholder="Search..."
        onChange={handleSearch}
        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </>
  );
};

export default Search;
