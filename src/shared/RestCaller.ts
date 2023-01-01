import { getCookie } from "react-use-cookie";
import { TextType } from "./EditTextModal";

export const findAllEntities = async (endpoint: string) => {
  try {
    const requestOptions = {
      method: "GET",
    };
    const response = await fetch(
      `${import.meta.env.VITE_REQUEST_URL}/${endpoint}`,
      requestOptions
    );
    return await response.json();
  } catch (err) {
    console.log(err);
  }
};

export const findTextByType = async (type: TextType) => {
  try {
    const requestOptions = {
      method: "GET",
    };
    const response = await fetch(
      `${import.meta.env.VITE_REQUEST_URL}/covering-letter/${type}`,
      requestOptions
    );
    return await response.json();
  } catch (err) {
    console.log(err);
  }
};

export const saveEntity = async (endpoint: string, body: string) => {
  try {
    const requestOptions = {
      method: "POST",
      headers: {
        authorization: `Bearer ${getCookie("token")}`,
        "Content-Type": "application/json",
      },
      body: body,
    };
    const response = await fetch(
      `${import.meta.env.VITE_REQUEST_URL}/${endpoint}`,
      requestOptions
    );
    return await response.json();
  } catch (err) {
    console.log(err);
  }
};

export const updateEntity = async (
  endpoint: string,
  id: string,
  body: string
) => {
  try {
    const requestOptions = {
      method: "PUT",
      headers: {
        authorization: `Bearer ${getCookie("token")}`,
        "Content-Type": "application/json",
      },
      body: body,
    };
    const response = await fetch(
      `${import.meta.env.VITE_REQUEST_URL}/${endpoint}/${id}`,
      requestOptions
    );
    return await response.json();
  } catch (err) {
    console.log(err);
  }
};

export const deleteEntity = async (endpoint: string, id: string) => {
  try {
    const requestOptions = {
      method: "DELETE",
      headers: {
        authorization: `Bearer ${getCookie("token")}`,
      },
    };
    await fetch(
      `${import.meta.env.VITE_REQUEST_URL}/${endpoint}/${id}`,
      requestOptions
    );
  } catch (err) {
    console.log(err);
  }
};
