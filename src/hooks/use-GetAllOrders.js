import axios from "axios";

const getAllOrders = async (cookie) => {
  try {
    const response = await axios.get("http://localhost:4001/Orders/Allorders", {
      headers: {
        authorization: cookie.access_token,
      },
    });
    return response.data; // Return only the data from the response
  } catch (error) {
    // Handle any errors that occur during the HTTP request
    console.error("Error fetching orders:", error);
    throw error; // Re-throw the error for the caller to handle if needed
  }
};

export default getAllOrders;
