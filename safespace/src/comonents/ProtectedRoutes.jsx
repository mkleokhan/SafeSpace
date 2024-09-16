import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Modal from "./Modal";

const ProtectedRoute = ({ children, requiredRole }) => {
  const { isLandlord, isTenant } = useSelector((state) => state.auth);
  const [showModal, setShowModal] = useState(false);
  const [canRender, setCanRender] = useState(false);
  const navigate = useNavigate();

  const userRole = isLandlord ? "landlord" : isTenant ? "tenant" : null;

  useEffect(() => {
    if (userRole === requiredRole) {
      // If user has the required role, allow rendering the content
      setCanRender(true);
    } else {
      // Show the modal if the user role does not match the required role
      setShowModal(true);
      setCanRender(false);
    }
  }, [userRole, requiredRole]);

  const handleClose = () => {
    setShowModal(false); // Close the modal
    navigate(-1); // Redirect to the previous page
  };

  // If the role matches, render the protected content
  if (canRender) {
    return children;
  }

  // Otherwise, show the modal and prevent rendering of protected content
  return (
    <>
      {showModal && (
        <Modal onClose={handleClose} title="Access Restricted">
          <p>You must be logged in as a landlord to access this page.</p>
        </Modal>
      )}
    </>
  );
};

export default ProtectedRoute;
