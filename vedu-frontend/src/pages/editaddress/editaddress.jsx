import React, { useEffect, useState } from "react";
import "./editaddress.css";
import Sidebar from "../../components/sidebar/sidebar";
import Navbar from "../../components/navbar/navbar";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { requestApi } from "../../utils/request";
import { RequestMethods } from "../../utils/request_methods";
import { setUser } from "../../redux/userSlice/userSlice";
function EditAddress() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.user.data);

  const [country, setCountry] = useState(userData?.country || "");
  const [city, setCity] = useState(userData?.city || "");
  const [code, setCode] = useState(userData?.code || "");
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
          setCountry(data.country);
          setCity(data.city);
          setCode(data.code);

          dispatch(setUser(data));
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      };

      fetchUserData();
    }
  }, [userData, navigate, dispatch]);

  const handleCancel = () => {
    navigate("/profile");
  };

  async function handleSubmitAddress() {
    const payload = {
      country: country,
      city: city,
      code: code,
    };

    try {
      const data = await requestApi({
        route: "/api/user/update-address",
        requestMethod: RequestMethods.PUT,
        body: payload,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (data.errors) {
        console.error("Validation errors:", data.errors);
      } else {
        console.log("Address updated successfully", data);

        dispatch(
          setUser({
            ...userData,
            country: payload.country,
            city: payload.city,
            code: payload.code,
          })
        );

        navigate("/profile");
      }
    } catch (error) {
      console.error("Error updating address:", error);
    }
  }

  const toggleSidebar = () => {
    setIsSidebarVisible((prev) => !prev);
  };

  const closeSidebar = () => {
    setIsSidebarVisible(false);
  };


  return (
    <div className="edit-address-page">
      <Navbar toggleSidebar={toggleSidebar} />
      <div className="Container">
        <Sidebar isVisible={isSidebarVisible} closeSidebar={closeSidebar} />
        <div className="content">
          <div className="address-content">
            <h3>Edit Address</h3>

            <div className="address-section">
              <div className="section-header">
                <h4>Address</h4>
              </div>
              <div className="address-info">
                <div className="info-group">
                  <label>Country</label>
                  <input
                    type="text"
                    placeholder="Example"
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                  />
                </div>
                <div className="info-group">
                  <label>City</label>
                  <input
                    type="text"
                    placeholder="Example"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                  />
                </div>
                <div className="info-group">
                  <label>Code</label>
                  <input
                    type="text"
                    placeholder="0000"
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                  />
                </div>
              </div>
            </div>

            <div className="form-actions">
              <button className="cancel-button" onClick={handleCancel}>
                Cancel
              </button>
              <button className="confirm-button" onClick={handleSubmitAddress}>
                Confirm
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditAddress;
