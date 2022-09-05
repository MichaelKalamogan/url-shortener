import React, { useEffect, useState } from "react";
import axios from "axios";

import AvailabilityComponent from "./ShortUrlAvailability";

function Shorten() {
  const [values, setValues] = useState({
    originalUrl: "",
    shortUrl: "",
  });
  const { originalUrl, shortUrl } = values;
  const [available, setAvailable] = useState(true);

  const handleChange = (name) => (event) => {
    setValues({ ...values, [name]: event.target.value });
  };

  //Loading state; loading a spinner to render conditionally
  const [isLoading, setIsLoading] = useState(false);

  const clickSubmit = (event) => {
    event.preventDefault();

    setIsLoading(true);

    axios
      .post(`${process.env.REACT_APP_SHORTEN_URL_SERVER}/create`, values)
      .then((data) => {
        console.log(data.data);
      })
      .catch((err) => {
        console.log("error", err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };
  // TODO Spinner and message below to show if slug is valid

  useEffect(() => {
    setIsLoading(true);
    axios
      .post(`${process.env.REACT_APP_SHORTEN_URL_SERVER}/checkShortUrl`, {
        shortUrl,
      })
      .then((resp) => setAvailable(resp))
      .finally(() => setIsLoading(false));
  }, [shortUrl]);

  const CheckingAvailability = () => {
    if (isLoading) {
      return (
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      );
    } else {
      return (
        <AvailabilityComponent shortUrl={shortUrl} available={available} />
      );
    }
  };

  return (
    <div style={{ width: "50%", margin: "50px auto" }}>
      <div className="mb-3">
        <label htmlFor="exampleInputEmail1" className="form-label">
          Original Url
        </label>
        <input
          className="form-control"
          type="url"
          name="originalUrl"
          value={originalUrl}
          onChange={handleChange("originalUrl")}
          placeholder="Type the original Url address to visit"
          aria-label="default input example"
        />
      </div>
      <div className="mb-3">
        <div>
          <label htmlFor="exampleInputPassword1" className="form-label">
            Desired Shortened Url
          </label>
          <input
            type="text"
            name="shortUrl"
            value={shortUrl}
            onChange={handleChange("shortUrl")}
            className="form-control"
            id="shortenedUrl"
          />
        </div>
        <div>
          <CheckingAvailability />
        </div>
      </div>
      <div className="mb-3 form-check"></div>
      <button onClick={clickSubmit} className="btn btn-primary">
        Submit
      </button>
    </div>
  );
}

export default Shorten;
