import React, { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./editpersonalinfo.css";
import Navbar from "../../components/navbar/navbar";
import Sidebar from "../../components/sidebar/sidebar";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { requestApi } from "../../utils/request";
import { RequestMethods } from "../../utils/request_methods";
import { setUser } from "../../redux/userSlice/userSlice";

function EditPersonalInfo() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.user.data);

  const [firstName, setFirstName] = useState(userData?.first_name || "");
  const [lastName, setLastName] = useState(userData?.last_name || "");
  const [email, setEmail] = useState(userData?.email || "");
  const [bio, setBio] = useState(userData?.bio || "");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState(userData?.phone_number || "");
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);

  useEffect(() => {
    if (!userData) {
      const fetchUserData = async () => {
        try {
          const data = await requestApi({
            route: "/api/user",
            requestMethod: RequestMethods.GET,
            navigationFunction: navigate,
          });

          setFirstName(data.first_name);
          setLastName(data.last_name);
          setEmail(data.email);
          setBio(data.bio);
          setPhoneNumber(data.phone_number);

          dispatch(setUser(data));
        } catch (error) {
          console.error("Error fetching user data:", error);
          toast.error("Error fetching user data.", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: true,
            pauseOnHover: true,
            draggable: true,
          });
        }
      };

      fetchUserData();
    }
  }, [userData, navigate, dispatch]);

  const handleCancel = () => {
    navigate("/profile");
  };

  async function handleSubmitPersonalInfo() {
    const payload = {
      first_name: firstName,
      last_name: lastName,
      email: email,
      bio: bio,
      password: password,
      password_confirmation: confirmPassword,
      phone_number: phoneNumber,
    };

    try {
      const data = await requestApi({
        route: "/api/user/update-personal-info",
        requestMethod: RequestMethods.PUT,
        body: payload,
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (data.errors) {
        console.error("Validation errors:", data.errors);
        toast.error("Validation errors. Please check your input.", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: true,
          pauseOnHover: true,
          draggable: true,
        });
      } else {
        console.log("Success:", data.message);
        toast.success("Personal information updated successfully.", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: true,
          pauseOnHover: true,
          draggable: true,
        });
        dispatch(
          setUser({
            ...userData,
            first_name: payload.first_name,
            last_name: payload.last_name,
            email: payload.email,
            bio: payload.bio,
            phone_number: payload.phone_number,
          })
        );

        navigate("/profile");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("An error occurred. Please try again.", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: true,
        pauseOnHover: true,
        draggable: true,
      });
    }
  }

  const toggleSidebar = () => {
    setIsSidebarVisible((prev) => !prev);
  };

  const closeSidebar = () => {
    setIsSidebarVisible(false);
  };

  return (
    <div className="edit-profile-page">
      <Navbar toggleSidebar={toggleSidebar} />
      <div className="Container">
        <Sidebar isVisible={isSidebarVisible} closeSidebar={closeSidebar} />
        <div className="content">
          <div className="profile-content">
            <h3>Edit Personal Information</h3>

            <div className="profile-section">
              <div className="section-header">
                <h4>Personal Information</h4>
              </div>
              <div className="personal-info">
                <div className="flex-row">
                  <div className="info-group">
                    <label>First Name</label>
                    <input
                      type="text"
                      placeholder="Example"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                    />
                  </div>
                  <div className="info-group">
                    <label>Last Name</label>
                    <input
                      type="text"
                      placeholder="Example"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                    />
                  </div>
                </div>
                <div className="flex-row">
                  <div className="info-group">
                    <label>Email</label>
                    <input
                      type="email"
                      placeholder="Example@gmail.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <div className="info-group">
                    <label>Bio</label>
                    <input
                      type="text"
                      placeholder="Example"
                      value={bio}
                      onChange={(e) => setBio(e.target.value)}
                    />
                  </div>
                </div>
                <div className="flex-row">
                  <div className="info-group">
                    <label>Password</label>
                    <input
                      type="password"
                      placeholder="***********"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                  <div className="info-group">
                    <label>Confirm Password</label>
                    <input
                      type="password"
                      placeholder="***********"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                  </div>
                </div>
                <div className="flex-row">
                  <div className="info-group">
                    <label>Phone Number</label>
                    <input
                      type="text"
                      placeholder="123456789"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                    />
                  </div>
                  <div className="info-group"></div>
                </div>
              </div>
            </div>
            <div className="form-actions">
              <button className="cancel-button" onClick={handleCancel}>
                Cancel
              </button>
              <button
                className="confirm-button"
                onClick={handleSubmitPersonalInfo}
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default EditPersonalInfo;
