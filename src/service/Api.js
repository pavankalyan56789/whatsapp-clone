import axios from "axios";

const url = "http://localhost:8000";

export const addUser = async (data) => {
  try {
    await axios.post(`${url}/users/add`, data);
  } catch (error) {
    console.log("error while adding user", error.message);
  }
};


export const getUser = async () => {
  try {
    let response = await axios.get(`${url}/users/get`);
    return response.data;
  } catch (error) {
    console.log("error while retrieving user", error.message);
  }
};


export const setConversation = async (data) => {
  try {
    await axios.post(`${url}/conversation/add`, data);
  } catch (error) {
    console.log("error while calling setConversation API", error.message);
  }
};

export const getConversation = async (data) => {
  try {
    let response = await axios.get(`${url}/conversation/get`, {
      params : data,
    });

    return response.data; 
  } catch (error) {
    console.log("error while calling getConversation API", error.message);
  }
};

export const addMessage = async (data) => {
  try {
    await axios.post(`${url}/messages/add`, data);
  } catch (error) {
    console.log("error while adding a message", error.message);
  }
};