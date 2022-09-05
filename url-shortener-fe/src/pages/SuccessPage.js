import React from "react";

function SuccessPage(props) {
  return (
    <div>
      <h1> Successfully shortened URL</h1>
      <h4>You can access the shortened Url for {props.originalUrl} at: </h4>
      <a href="props.shortUrl"> {props.shortUrl}</a>
    </div>
  );
}

export default SuccessPage;
