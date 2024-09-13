import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../../firebase/firebase"; // Your firebase setup
import {
  TextField,
  Button,
  Container,
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import axios from "axios";

// Validation Schema using Yup
const validationSchema = Yup.object({
  title: Yup.string().required("Title is required"),
  description: Yup.string().required("Description is required"),
  rentPerMonth: Yup.number()
    .required("Rent per month is required")
    .positive("Rent must be a positive number"),
  location: Yup.object({
    address: Yup.string().required("Address is required"),
    city: Yup.string().required("City is required"),
    zipCode: Yup.string().required("Zip Code is required"),
  }),
  facilities: Yup.string().required("Facilities are required"),
  beds: Yup.number()
    .required("Number of beds is required")
    .min(1, "At least one bed is required"),
  attachBathroom: Yup.boolean(),
  images: Yup.mixed().required("At least one image is required"),
});

const PostRoom = () => {
  const [imageFiles, setImageFiles] = useState(null);
  const token = localStorage.getItem("token");

  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
      rentPerMonth: "",
      location: {
        address: "",
        city: "",
        zipCode: "",
      },
      images: null,
      facilities: "",
      beds: "",
      attachBathroom: false,
    },
    validationSchema,
    onSubmit: async (values) => {
      const formData = new FormData();
      formData.append("title", values.title);
      formData.append("description", values.description);
      formData.append("rentPerMonth", values.rentPerMonth);
      formData.append("location[address]", values.location.address);
      formData.append("location[city]", values.location.city);
      formData.append("location[zipCode]", values.location.zipCode);
      formData.append("facilities", values.facilities);
      formData.append("beds", values.beds);
      formData.append("attachBathroom", values.attachBathroom);

      // Upload images to Firebase and get their URLs
      const imageUrls = [];
      if (imageFiles) {
        for (let i = 0; i < imageFiles.length; i++) {
          const storageRef = ref(storage, `images/${imageFiles[i].name}`);
          const snapshot = await uploadBytes(storageRef, imageFiles[i]);
          const downloadURL = await getDownloadURL(snapshot.ref);
          imageUrls.push(downloadURL); // Store the image URL in the array
        }
      }

      // Append image URLs to formData
      formData.append("imageUrls", JSON.stringify(imageUrls));

      try {
        const response = await axios.post(
          "http://localhost:5000/rooms/postroom",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              "x-auth-token": token,
            },
          }
        );
        console.log(response.data);
      } catch (error) {
        console.error(error);
      }
    },
  });

  const handleFileChange = (event) => {
    const files = event.target.files;
    if (files) {
      setImageFiles(files);
      formik.setFieldValue("images", files);
    }
  };

  return (
    <Container
      component="main"
      maxWidth="md"
      className="p-6 bg-white rounded-lg shadow-md"
    >
      {!token ? (
        <center>
          <h1 className="font-bold">Log in First</h1>
        </center>
      ) : (
        <>
          <h1 className="text-2xl font-bold mb-4 text-center">
            Add Room Details
          </h1>
          <form onSubmit={formik.handleSubmit}>
            {/* Title */}
            <TextField
              fullWidth
              label="Title"
              name="title"
              value={formik.values.title}
              onChange={formik.handleChange}
              error={formik.touched.title && Boolean(formik.errors.title)}
              helperText={formik.touched.title && formik.errors.title}
              margin="normal"
            />

            {/* Description */}
            <TextField
              fullWidth
              label="Description"
              name="description"
              value={formik.values.description}
              onChange={formik.handleChange}
              error={
                formik.touched.description && Boolean(formik.errors.description)
              }
              helperText={
                formik.touched.description && formik.errors.description
              }
              margin="normal"
            />

            {/* Rent per month */}
            <TextField
              fullWidth
              label="Rent Per Month"
              name="rentPerMonth"
              type="number"
              value={formik.values.rentPerMonth}
              onChange={formik.handleChange}
              error={
                formik.touched.rentPerMonth &&
                Boolean(formik.errors.rentPerMonth)
              }
              helperText={
                formik.touched.rentPerMonth && formik.errors.rentPerMonth
              }
              margin="normal"
            />

            {/* Location */}
            <TextField
              fullWidth
              label="Address"
              name="location.address"
              value={formik.values.location.address}
              onChange={formik.handleChange}
              error={
                formik.touched.location?.address &&
                Boolean(formik.errors.location?.address)
              }
              helperText={
                formik.touched.location?.address &&
                formik.errors.location?.address
              }
              margin="normal"
            />
            <TextField
              fullWidth
              label="City"
              name="location.city"
              value={formik.values.location.city}
              onChange={formik.handleChange}
              error={
                formik.touched.location?.city &&
                Boolean(formik.errors.location?.city)
              }
              helperText={
                formik.touched.location?.city && formik.errors.location?.city
              }
              margin="normal"
            />
            <TextField
              fullWidth
              label="Zip Code"
              name="location.zipCode"
              value={formik.values.location.zipCode}
              onChange={formik.handleChange}
              error={
                formik.touched.location?.zipCode &&
                Boolean(formik.errors.location?.zipCode)
              }
              helperText={
                formik.touched.location?.zipCode &&
                formik.errors.location?.zipCode
              }
              margin="normal"
            />

            {/* Image Upload */}
            <input
              type="file"
              name="images"
              accept="image/*"
              multiple
              onChange={handleFileChange}
              style={{ margin: "20px 0" }}
            />
            {formik.errors.images && formik.touched.images && (
              <div style={{ color: "red" }}>{formik.errors.images}</div>
            )}

            {/* Facilities */}
            <TextField
              fullWidth
              label="Facilities"
              name="facilities"
              value={formik.values.facilities}
              onChange={formik.handleChange}
              error={
                formik.touched.facilities && Boolean(formik.errors.facilities)
              }
              helperText={formik.touched.facilities && formik.errors.facilities}
              margin="normal"
            />

            {/* Beds */}
            <TextField
              fullWidth
              label="Beds"
              name="beds"
              type="number"
              value={formik.values.beds}
              onChange={formik.handleChange}
              error={formik.touched.beds && Boolean(formik.errors.beds)}
              helperText={formik.touched.beds && formik.errors.beds}
              margin="normal"
            />

            {/* Attach Bathroom */}
            <FormControlLabel
              control={
                <Checkbox
                  name="attachBathroom"
                  checked={formik.values.attachBathroom}
                  onChange={formik.handleChange}
                />
              }
              label="Attach Bathroom"
            />

            {/* Submit Button */}
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              className="mt-4"
            >
              Submit
            </Button>
          </form>
        </>
      )}
    </Container>
  );
};

export default PostRoom;
