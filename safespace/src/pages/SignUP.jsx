// SignupPage.jsx
import React, { useState } from "react";
import { TextField, Button, Container } from "@mui/material";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";

// Validation schema
const validationSchema = Yup.object({
  name: Yup.string().required("Name is required"),
  CNIC: Yup.string()
    .matches(
      /^\d{5}-\d{7}-\d{1}$/,
      "CNIC must be in the format 12345-1234567-1"
    )
    .required("CNIC is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  phone: Yup.string()
    .matches(/^\d{10}$/, "Phone number must be exactly 10 digits")
    .required("Phone number is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
  address: Yup.string().required("Address is required"),
  zipCode: Yup.string()
    .matches(/^\d{5}$/, "Zip code must be exactly 5 digits")
    .required("Zip code is required"),
});

// CNIC Formatting Function
const formatCNIC = (value) => {
  const cleaned = value.replace(/\D/g, "");
  if (cleaned.length <= 5) return cleaned;
  if (cleaned.length <= 12) return `${cleaned.slice(0, 5)}-${cleaned.slice(5)}`;
  return `${cleaned.slice(0, 5)}-${cleaned.slice(5, 12)}-${cleaned.slice(
    12,
    13
  )}`;
};

// Phone Number Formatting Function
const formatPhoneNumber = (value) => {
  const cleaned = value.replace(/\D/g, "");
  return cleaned.slice(0, 10);
};

// Zip Code Formatting Function
const formatZipCode = (value) => {
  const cleaned = value.replace(/\D/g, "");
  return cleaned.slice(0, 5);
};

const SignupPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    CNIC: "",
    email: "",
    phone: "",
    password: "",
    address: "",
    zipCode: "",
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
    let formattedValue = value;

    if (name === "CNIC") {
      formattedValue = formatCNIC(value);
    } else if (name === "phone") {
      formattedValue = formatPhoneNumber(value);
    } else if (name === "zipCode") {
      formattedValue = formatZipCode(value);
    }

    setFormData({ ...formData, [name]: formattedValue });
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
            "http://localhost:5000/landlord/createUser",
            formData
          );
          console.log(response);
          navigate("/landlord-signin");
        } catch (error) {
          console.error("Error:", error);
        }
      } else if (isTenant) {
        try {
          const response = await axios.post(
            "http://localhost:5000/tenant/createUser",
            formData
          );
          console.log(response);
          navigate("/tenant-signin");
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
      console.log("Signing up as Landlord");
    } else if (role === "tenant") {
      setIsLandlord(false);
      setIsTenant(true);
      console.log("Signing up as Tenant");
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center">
      <Container
        component="main"
        maxWidth="md"
        className="p-6 bg-white rounded-lg shadow-md"
      >
        <h1 className="text-2xl font-bold mb-4 text-center">Sign Up as</h1>
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
        <>
          {!isTenant && !isLandlord ? (
            <></>
          ) : (
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="mb-4">
                  <TextField
                    name="name"
                    label="Name"
                    fullWidth
                    variant="outlined"
                    margin="normal"
                    value={formData.name}
                    onChange={handleChange}
                    sx={{
                      color: "black",
                      "& .MuiOutlinedInput-root": {
                        "& input": {
                          color: "black",
                        },
                        "&.Mui-error .MuiOutlinedInput-notchedOutline": {
                          borderColor: "red",
                        },
                      },
                    }}
                    error={Boolean(errors.name)}
                    helperText={errors.name}
                  />
                </div>
                <div className="mb-4">
                  <TextField
                    name="CNIC"
                    label="CNIC"
                    fullWidth
                    variant="outlined"
                    margin="normal"
                    value={formData.CNIC}
                    onChange={handleChange}
                    sx={{
                      color: "black",
                      "& .MuiOutlinedInput-root": {
                        "& input": {
                          color: "black",
                        },
                        "&.Mui-error .MuiOutlinedInput-notchedOutline": {
                          borderColor: "red",
                        },
                      },
                    }}
                    error={Boolean(errors.CNIC)}
                    helperText={errors.CNIC}
                  />
                </div>
                <div className="mb-4">
                  <TextField
                    name="email"
                    label="Email"
                    fullWidth
                    variant="outlined"
                    margin="normal"
                    value={formData.email}
                    onChange={handleChange}
                    sx={{
                      color: "black",
                      "& .MuiOutlinedInput-root": {
                        "& input": {
                          color: "black",
                        },
                        "&.Mui-error .MuiOutlinedInput-notchedOutline": {
                          borderColor: "red",
                        },
                      },
                    }}
                    error={Boolean(errors.email)}
                    helperText={errors.email}
                  />
                </div>
                <div className="mb-4">
                  <TextField
                    name="phone"
                    label="Phone"
                    fullWidth
                    variant="outlined"
                    margin="normal"
                    value={formData.phone}
                    onChange={handleChange}
                    sx={{
                      color: "black",
                      "& .MuiOutlinedInput-root": {
                        "& input": {
                          color: "black",
                        },
                        "&.Mui-error .MuiOutlinedInput-notchedOutline": {
                          borderColor: "red",
                        },
                      },
                    }}
                    error={Boolean(errors.phone)}
                    helperText={errors.phone}
                  />
                </div>
                <div className="mb-4">
                  <TextField
                    name="password"
                    label="Password"
                    type="password"
                    fullWidth
                    variant="outlined"
                    margin="normal"
                    value={formData.password}
                    onChange={handleChange}
                    sx={{
                      color: "black",
                      "& .MuiOutlinedInput-root": {
                        "& input": {
                          color: "black",
                        },
                        "&.Mui-error .MuiOutlinedInput-notchedOutline": {
                          borderColor: "red",
                        },
                      },
                    }}
                    error={Boolean(errors.password)}
                    helperText={errors.password}
                  />
                </div>
                <div className="mb-4">
                  <TextField
                    name="address"
                    label="Address"
                    fullWidth
                    variant="outlined"
                    margin="normal"
                    value={formData.address}
                    onChange={handleChange}
                    sx={{
                      color: "black",
                      "& .MuiOutlinedInput-root": {
                        "& input": {
                          color: "black",
                        },
                        "&.Mui-error .MuiOutlinedInput-notchedOutline": {
                          borderColor: "red",
                        },
                      },
                    }}
                    error={Boolean(errors.address)}
                    helperText={errors.address}
                  />
                </div>
                <div className="mb-4">
                  <TextField
                    name="zipCode"
                    label="Zip Code"
                    fullWidth
                    variant="outlined"
                    margin="normal"
                    value={formData.zipCode}
                    onChange={handleChange}
                    sx={{
                      color: "black",
                      "& .MuiOutlinedInput-root": {
                        "& input": {
                          color: "black",
                        },
                        "&.Mui-error .MuiOutlinedInput-notchedOutline": {
                          borderColor: "red",
                        },
                      },
                    }}
                    error={Boolean(errors.zipCode)}
                    helperText={errors.zipCode}
                  />
                </div>
              </div>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                className="mt-4"
              >
                Sign Up
              </Button>
            </form>
          )}
        </>
      </Container>
    </div>
  );
};

export default SignupPage;
