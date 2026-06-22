import { useState } from "react";
import { createCamp } from "../services/hostService"
import { useNavigate } from "react-router-dom";

const CreateCamp = () => {
  const [activityName, setActivityName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [location, setLocation] = useState("");

  const navigate = useNavigate();

  const handleCreateCamp = async (e) => {
    e.preventDefault();

    try {
      const formData = {
        activityName,
        description,
        price,
        location,
      }
      console.log(formData);
      const data = await createCamp(formData);
      console.log(data);
      if (!data.error) {
        navigate("/host/my-camps");
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <form onSubmit={handleCreateCamp}>
      <div>
        <label>Activity Name</label>
        <input
          type="text"
          value={activityName}
          onChange={(e) => setActivityName(e.target.value)}
        />
      </div>

      <div>
        <label>Description</label>
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>

      <div>
        <label>Price</label>
        <input
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
      </div>

      <div>
        <label>Location</label>
        <input
          type="text"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
      </div>

      <button type="submit">
        Create Camp
      </button>
    </form>
  );
};


export default CreateCamp;