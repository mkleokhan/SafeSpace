import React, { useState } from "react";
import {
  TextField,
  Button,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { setToken, setRole, setErrors } from "../../Redux/authSlice"; // Adjust import path as needed
import BookingModal from "./BookingModal";

// Validation schema for sign-in
const validationSchema = Yup.object({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

const SignInModal = ({ open, onClose }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { errors: reduxErrors, isTenant } = useSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const validate = (values) => {
    try {
      validationSchema.validateSync(values, { abortEarly: false });
      return {};
    } catch (err) {
      return err.inner.reduce((acc, error) => {
        acc[error.path] = error.message;
        return acc;
      }, {});
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formErrors = validate(formData);
    dispatch(setErrors(formErrors));

    if (Object.keys(formErrors).length === 0) {
      try {
        const response = await axios.post(
          "http://localhost:5000/auth/tenant", // Only the tenant endpoint
          formData
        );

        console.log(response.data);
        // If login is successful, dispatch token and role
        dispatch(setToken(response.data));
        dispatch(setRole("tenant"));
        localStorage.setItem("token", response.data);
        <BookingModal />;

        onClose(); // Close the modal after successful login
      } catch (error) {
        console.error("Error during login:", error);
      }
    }
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Sign In</DialogTitle>
      <DialogContent>
        <div className="flex flex-col items-center">
          <h1 className="text-lg font-bold mb-4">Sign In as Tenant</h1>
          <form onSubmit={handleSubmit} className="w-full">
            <div className="mb-4">
              <TextField
                name="email"
                label="Email"
                fullWidth
                variant="outlined"
                value={formData.email}
                onChange={handleChange}
                error={Boolean(reduxErrors.email)}
                helperText={reduxErrors.email}
              />
            </div>
            <div className="mb-4">
              <TextField
                name="password"
                label="Password"
                type="password"
                fullWidth
                variant="outlined"
                value={formData.password}
                onChange={handleChange}
                error={Boolean(reduxErrors.password)}
                helperText={reduxErrors.password}
              />
            </div>
            <Button type="submit" variant="contained" color="primary" fullWidth>
              Sign In
            </Button>
          </form>
        </div>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary">
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default SignInModal;
