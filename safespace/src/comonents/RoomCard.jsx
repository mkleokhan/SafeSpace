import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // Carousel styles
import { Button } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { IconButton } from "@mui/material";

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
      className="p-4 border rounded-lg shadow-md transition-transform duration-300 ease-in-out md:hover:scale-105"
      onMouseOver={(e) => {
        e.currentTarget.style.cursor = "pointer"; // Change cursor to pointer on hover
      }}
      onMouseOut={(e) => {
        e.currentTarget.style.cursor = "pointer"; // Change cursor to pointer on hover
      }}
    >
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
            <div key={index} className="w-full h-auto" onClick={clickHandler}>
              <img
                src={image}
                alt={`Room ${index + 1}`}
                className="w-full h-auto object-cover" // Responsive image
              />
            </div>
          ))}
        </Carousel>
      </div>
      <Button
        style={{ marginTop: "16px" }} // Equivalent to mt-4
        variant="contained"
        color="primary"
        onClick={clickHandler}
      >
        Rent
      </Button>
      <Button
        style={{ marginTop: "16px", marginLeft: "16px" }} // Equivalent to mt-4
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
        <FavoriteIcon /> {/* Icon for adding to favorites */}
      </IconButton>
    </div>
  );
};

export default RoomCard;
