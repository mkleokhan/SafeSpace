import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // Carousel styles
import { Button, IconButton } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";

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
  console.log("images in card", images); // Log images to verify URLs

  return (
    <div className="p-4 border rounded-lg shadow-md transition-transform duration-300 ease-in-out md:hover:scale-105">
      <h2 className="text-xl font-bold mb-2" onClick={clickHandler}>
        {title}
      </h2>
      <p className="mb-2" onClick={clickHandler}>
        {description}
      </p>
      <p className="mb-2" onClick={clickHandler}>
        Location: {location}, {city}, {zipCode}
      </p>
      <p className="mb-2" onClick={clickHandler}>
        Rent per Month: ${rent}
      </p>
      <p className="mb-2" onClick={clickHandler}>
        Beds: {beds}
      </p>
      <p className="mb-4" onClick={clickHandler}>
        Landlord: {landlord}
      </p>

      {/* Carousel for images */}
      <div className="max-w-full mx-auto">
        <Carousel
          showThumbs={false}
          infiniteLoop
          autoPlay
          className="w-full" // Make sure the carousel takes the full width of its container
        >
          {images.map((image, index) => (
            <div key={index} className="w-full h-auto">
              <img
                src={image}
                alt={`Room ${index + 1}`}
                className="w-full h-auto object-contained "
              />
            </div>
          ))}
        </Carousel>
      </div>
      <Button
        style={{ marginTop: "16px" }}
        variant="contained"
        color="primary"
        onClick={clickHandler}
      >
        Book
      </Button>
      <Button
        style={{ marginTop: "16px", marginLeft: "16px" }}
        variant="contained"
        color="primary"
        onClick={clickHandler}
      >
        Details
      </Button>
      <IconButton
        style={{ marginTop: "16px", marginLeft: "16px" }}
        color="primary"
        onClick={clickHandler}
      >
        <FavoriteIcon />
      </IconButton>
    </div>
  );
};

export default RoomCard;
