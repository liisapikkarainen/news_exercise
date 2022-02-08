import React from "react";

export default function Details({title, image, description, close}) {
  return (
    <div>
      <h3>{title}</h3>
      <img src={image} />
      <p>{description}</p>
      <a href="#" onClick={close}>Back to news</a>
    </div>
  );
}
