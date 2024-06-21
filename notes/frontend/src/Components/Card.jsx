import React from "react";

function Card({ item }) {
  return (
    <>
      <div className="mt-7 my-3 p-3">
        <div className="card w-96 card-body shadow-xl hover:scale-105 duration-200">
          <figure>
            <img src={item.image} alt="Shoes" />
          </figure>
          <div className="card-body">
            <h2 className="card-title">
              {item.name}
              <div className="badge bag-free">{item.category}</div>
            </h2>
            <p>{item.title}</p>
            <div className="card-actions flex justify-between mt-2">
              <div className="badge badge-outline badge-price">
                ${item.price}
              </div>
              <div className="badge badge-outline card-btn p-3  hover:duration-200 p-2">
                Buy Now
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Card;
