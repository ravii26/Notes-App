import React, { useEffect, useState } from "react";
import axios from "axios";

function Devices() {
  const [devices, setDevices] = useState([
    {
      deviceName: "",
      deviceId: "",
      lastLogin: "",
    },
  ]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    try {
      const getdevices = async () => {
        const response = await axios.get("http://localhost:5000/api/v1/get-devices", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setDevices(response.data.devices);
      };
      getdevices();
    } catch (error) {
      console.log("Error fetching devices:", error);
    }
  }, []);
    
    const handleDelete = async (deviceId) => {
        const token = localStorage.getItem("token");
        try {   
            const response = await axios.get(`http://localhost:5000/api/v1/remove-device?deviceId=${deviceId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            if (response.status === 200) {
                setDevices(devices.filter((device) => device.deviceId !== deviceId));
            }
        }
        catch (error) {
            console.log("Error deleting device:", error);
        }
    }

  return (
    <div>
      <div className="container main-content">
        <div className="container ">
          {/* <div className="d-flex justify-content-center">
            <div className="input-group" style={{ maxWidth: 300 }}>
              <span className="input-group-text" id="basic-addon1">
                  <i className="bx bx-search" />
                </span>
            </div>
          </div> */}
        </div>
        {devices.length === 0 && (
          <h1
            style={{
              textAlign: "center",
              marginTop: "20px",
              fontStyle: "italic",
              color: "gray",
              fontSize: "25px",
            }}
          >
            No Categories available
          </h1>
        )}
        {devices.length > 0 && (
          <div className="table-responsive-wrapper"
          style={{ overflowX: "auto", marginTop: "20px" }}>
            <table
            className="category-table-c table table-bordered"
            style={{ marginTop: "20px" }}
          >
            <thead>
              <tr>
                <th>No.</th>
                <th>ID</th>
                <th>Last Login Date</th>
                            <th>Device Name</th>
                <th>Logout</th>
              </tr>
            </thead>
            <tbody>
              {devices.map((device, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{device.deviceId}</td>
                  <td>{device.lastLogin.slice(0,10)}</td>
                  <td>{device.deviceName}</td>
                  <td>
                    <button
                      className="btn btn-danger btn-danger-c btn-sm m-2"
                      onClick={() => handleDelete(device.deviceId)}
                    >
                      <i className="bx bx-trash" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          </div>
        )}
      </div>
    </div>
  );
}

export default Devices;
