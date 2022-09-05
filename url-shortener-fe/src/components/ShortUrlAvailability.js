import React from "react";

function AvailabilityComponent({ available, shortUrl }) {
  if (!available) return <div>Requested Url is not available</div>;

  if (available && shortUrl !== "") {
    return (
      <div>
        <h6>Short Url is available</h6>
      </div>
    );
  } else return <></>;
}

export default AvailabilityComponent;
