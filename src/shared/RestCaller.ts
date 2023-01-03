import { getCookie } from "react-use-cookie";
import { TextType } from "./modals/EditTextModal";

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

export const sendEmail = async (email: string) => {
  try {
    const requestOptions = {
      method: "GET",
    };
    const response = await fetch(
      `${import.meta.env.VITE_REQUEST_URL}/send/${email}`,
      requestOptions
    );

    const res = await response;
    if (res.status === 400) return await response.json();
    else return undefined;
  } catch (err) {
    console.log(err);
  }
};

export const validateCaptcha = async (token: string) => {
  try {
    const secret = import.meta.env.VITE_CAPTCHA_PRIVATE_KEY;
    const requestOptions = {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/x-www-form-urlencoded; charset=utf-8",
      },
      body: `secret=${secret}&response=${token}`,
    };
    const response = await fetch(
      "https://www.google.com/recaptcha/api/siteverify",
      requestOptions
    );

    const data = await response.json();
    console.log(data);
    return data.success;
  } catch (err) {
    console.log(err);
  }
};
