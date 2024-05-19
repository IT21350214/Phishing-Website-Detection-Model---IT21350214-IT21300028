import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaExclamationTriangle, FaCheckCircle } from "react-icons/fa";

const AddUrl = () => {
  const [recentUrls, setRecentUrls] = useState([]);
  const [urlLink, setUrlLink] = useState("");

  useEffect(() => {
    getRecentUrls();
  }, []);

  const getRecentUrls = () => {
    axios
      .get(`http://localhost:8081/api/urls`)
      .then((res) => {
        setRecentUrls(res.data.urls);
      })
      .catch((err) => {
        alert("Error in getting URLs");
      });
  };

  const searchUrl = () => {
    addUrl();
  };

  const addUrl = () => {
    const body = {
      urlLink
    };

    axios
      .post(`http://localhost:8081/api/urls/add`, body)
      .then((res) => {
        alert(`URL Added to Database with status: ${res.data.status}`);
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
        alert("Error in adding URL");
      });
  };

  return (
    <div>
      <div className="input-container">
        <h1 className="heading">Phishing URL Detection</h1>
        <input
          type="text"
          className="input-url"
          placeholder="Enter the URL"
          onChange={(e) => {
            setUrlLink(e.target.value);
          }}
        />

        <button className="btn-check" onClick={searchUrl}>
          Check the URL
        </button>
      </div>

      <div>
        {recentUrls.map((url, index) => (
          <div key={index}>
            {index === 0 && <h2>Last Checked</h2>}
            <div className="recenturl-container">
              <h2 className="text-white">
                Status : {url.status}
                {url.status.toLowerCase() === "phishing" && (
                  <FaExclamationTriangle className="danger-icon" />
                )}
                {url.status.toLowerCase() === "legitimate" && (
                  <FaCheckCircle className="correct-icon" />
                )}
              </h2>
              <h4 className="text-white">URL : {url.urlLink}</h4>
            </div>
            {index === 0 && (
              <>
                <h2>Your Recent Searches</h2>
                <hr
                  style={{
                    height: "2px",
                    backgroundColor: "white",
                    border: "none",
                    marginBottom: "20px",
                  }}
                />
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AddUrl;
