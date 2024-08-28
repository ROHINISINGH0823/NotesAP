import React from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

function Card({ item }) {
  const navigate = useNavigate();

  const handleViewClick = async () => {
    try {
      // Fetch the topic based on the item name
      const response = await axios.get(`http://localhost:4001/search?tag=${item.name}`);
      const searchResults = response.data;

      if (searchResults.length > 0) {
        // Redirect to the detailed page with the matched topic
        navigate(`/topic/${searchResults[0]._id}`, { state: { searchResults } });
      } else {
        toast.error('No matching topic found');
      }
    } catch (error) {
      console.error(error);
      toast.error('An error occurred while fetching the topic');
    }
  };

  return (
    <>
      <div className="mt-4 my-3 p-3">
        <div className="card w-92 bg-base-100 shadow-xl hover:scale-105 duration-200 dark:bg-slate-900 dark:text-white dark:border">
          <figure>
            <img src={item.image} alt={item.name} onClick={handleViewClick} />
          </figure>
          <div className="card-body">
            <h2 className="card-title">
              {item.name}
              <div className="badge badge-secondary">{item.category}</div>
            </h2>
            <p>{item.title}</p>
            <div className="card-actions justify-between">
              <div className="badge badge-outline">${item.price}</div>
              <div
                className="cursor-pointer px-2 py-1 rounded-full border-[2px] hover:bg-pink-500 hover:text-white duration-200"
                style={{
                  backgroundColor: "#5a3567",
                  borderColor: "#5a3567",
                  color: "#FFFFFF", // White text color
                }}
                onClick={handleViewClick}
              >
                View
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Card;
