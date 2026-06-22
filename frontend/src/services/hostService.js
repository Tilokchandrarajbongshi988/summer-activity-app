export const createCamp = async (formData) =>{
  const response = await fetch(
    "http://localhost:5000/api/host/camp",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body:JSON.stringify(formData),
    }
  );
  return response.json();
}

export const getMyCamps = async () => {
  const response = await fetch(
    "http://localhost:5000/api/host/my-camps",
    {
      credentials: "include",
    }
  );
  console.log(response);
  return response.json();
}

export const getCampById = async (campId) => {
  const response = await fetch(
    `http://localhost:5000/api/guest/camps/${campId}`,
    {
      credentials: "include",
    }
  );
  return response.json();
};

export const updateCamp = async (campId, formData) => {
  const response = await fetch(
    `http://localhost:5000/api/host/camp/${campId}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(formData),
    }
  );

  return response.json();
};

export const deleteCamp = async (campId) => {
  const response = await fetch(
    `http://localhost:5000/api/host/camp/${campId}`,
    {
      method: "DELETE",
      credentials: "include",
    }
  );

  return response.json();
};