export const getMyCamps = async () => {
  const response = await fetch(
    "http://localhost:5000/api/guest/my-camps",
    {
      credentials: "include",
    }
  );
  console.log(response);
  return response.json();
}