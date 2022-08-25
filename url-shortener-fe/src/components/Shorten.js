import React, { useEffect, useState } from "react";
import API from "../utils/API";

function Shorten() {
  const [formData, setFormData] = useState({
    url: "",
    slug: "",
  });

  const handleChange = async (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  useEffect(() => API.slugCheck(), [formData]);

  const handleSubmit = (event) => {
    console.log(formData);
    event.preventDefault();
  };
  // TODO Spinner and message below to show if slug is valid
  return (
    <div>
      <label>
        Url
        <input
          name="url"
          type="string"
          value={formData.url}
          onChange={handleChange}
        />
      </label>
      <br />
      <label>
        Preferred Slug:
        <input
          name="slug"
          type="string"
          value={formData.slug}
          onChange={handleChange}
        />
      </label>
      <button onClick={handleSubmit} />
    </div>
  );
}

export default Shorten;
