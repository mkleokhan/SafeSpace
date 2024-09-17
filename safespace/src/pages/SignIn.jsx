import React, { useState } from "react";
import { TextField, Button, Container } from "@mui/material";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  setToken,
  setRole,
  setErrors,
  setLandlordData,
  setTenantData,
} from "../../Redux/authSlice"; // Import setLandlordData

// Validation schema for sign-in
const validationSchema = Yup.object({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

const SigninPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    errors: reduxErrors,
    isLandlord,
    isTenant,
  } = useSelector((state) => state.auth);

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
          isLandlord
            ? "http://localhost:5000/auth/landlord"
            : "http://localhost:5000/auth/tenant",
          formData
        );

        console.log("RESPONSE", response);
        // console.log(response.data);
        // If login is successful, dispatch token and role
        dispatch(setToken(response.data.token)); // Assuming token is in response.data.token
        dispatch(setRole(isLandlord ? "landlord" : "tenant"));

        if (isLandlord) {
          dispatch(setLandlordData(response.data.landlord)); // Assuming landlordData is in response.data.landlordData
        } else {
          dispatch(setTenantData(response.data.tenant));
        }

        localStorage.setItem("token", response.data);

        // Navigate to appropriate page after login
        navigate(isLandlord ? "/landlord/home" : "/");
      } catch (error) {
        console.error("Error during login:", error);
      }
    }
  };

  const toggleTenantLandlord = (role) => {
    dispatch(setRole(role));
  };

  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center">
      <Container
        component="main"
        maxWidth="sm"
        className="p-6 bg-white rounded-lg shadow-md"
      >
        <h1 className="text-2xl font-bold mb-4 text-center">Sign In as</h1>
        <center>
          <h1 className="font-bold">
            Please select whether your are Tenant or Landlord
          </h1>
        </center>
        <div className="flex justify-center space-x-4 mt-4">
          <Button
            variant={isLandlord ? "contained" : "outlined"}
            onClick={() => toggleTenantLandlord("landlord")}
          >
            Landlord
          </Button>
          <Button
            variant={isTenant ? "contained" : "outlined"}
            onClick={() => toggleTenantLandlord("tenant")}
          >
            Tenant
          </Button>
        </div>
        {(isTenant || isLandlord) && (
          <form onSubmit={handleSubmit} className="mt-4">
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
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              className="mt-4"
            >
              Sign In
            </Button>
          </form>
        )}
      </Container>
    </div>
  );
};

export default SigninPage;
