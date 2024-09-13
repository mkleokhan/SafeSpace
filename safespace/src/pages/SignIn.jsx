import React, { useState } from "react";
import { TextField, Button, Container } from "@mui/material";
import * as Yup from "yup";
import axios from "axios";
import { json, useNavigate } from "react-router-dom";

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
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [isLandlord, setIsLandlord] = useState(false);
  const [isTenant, setIsTenant] = useState(false);
  const navigate = useNavigate();

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
    setErrors(formErrors);

    if (Object.keys(formErrors).length === 0) {
      console.log(formData);
      if (isLandlord) {
        try {
          const response = await axios.post(
            "http://localhost:5000/auth/landlord",
            formData
          );
          console.log(response.data);
          window.localStorage.setItem(
            "token",
            JSON.stringify({ token: response.data })
          );
          // navigate("/postroom");
        } catch (error) {
          console.error("Error:", error);
        }
      } else if (isTenant) {
        try {
          const response = await axios.post(
            "http://localhost:5000/tenant/signin",
            formData
          );
          console.log(response);
          navigate("/tenant-dashboard");
        } catch (error) {
          console.error("Error:", error);
        }
      }
    }
  };

  const toggleTenantLandlord = (role) => {
    if (role === "landlord") {
      setIsLandlord(true);
      setIsTenant(false);
      console.log("Signing in as Landlord");
    } else if (role === "tenant") {
      setIsLandlord(false);
      setIsTenant(true);
      console.log("Signing in as Tenant");
    }
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
        {!isTenant && !isLandlord ? (
          <></>
        ) : (
          <form onSubmit={handleSubmit} className="mt-4">
            <div className="mb-4">
              <TextField
                name="email"
                label="Email"
                fullWidth
                variant="outlined"
                value={formData.email}
                onChange={handleChange}
                error={Boolean(errors.email)}
                helperText={errors.email}
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
                error={Boolean(errors.password)}
                helperText={errors.password}
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
