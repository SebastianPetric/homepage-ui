import { getCookie } from "react-use-cookie";
import { TextType } from "./description/EditDescriptionTextModal";

export enum ENDPOINT {
  COVERING_LETTER = "covering-letter",
  ACADEMIC = "academic",
  CAREER = "career",
  EXPERIENCES = "experiences",
  SEND = "send",
  USERS = "users",
}

export const findAllEntities = async (endpoint: string) => {
  try {
    const requestOptions = {
      method: "GET",
    };
    return await fetchWithoutParameter(endpoint, requestOptions);
  } catch (err) {
    console.log(err);
  }
};

export const findTextByType = async (type: TextType) => {
  try {
    const requestOptions = {
      method: "GET",
    };
    return await fetchWithParameter(
      ENDPOINT.COVERING_LETTER.valueOf(),
      type,
      requestOptions
    );
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
    return await fetchWithoutParameter(endpoint, requestOptions);
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
    return await fetchWithParameter(endpoint, id, requestOptions);
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

export const sendEmail = async (
  email: string,
  clientCaptchaSolution: string,
  optionalText?: string
) => {
  try {
    const requestOptions = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        optionalText,
        solution: clientCaptchaSolution,
        sitekey: `${import.meta.env.VITE_CAPTCHA_SITE_KEY}`,
      }),
    };
    return await fetch(
      `${import.meta.env.VITE_REQUEST_URL}/${ENDPOINT.SEND.valueOf()}`,
      requestOptions
    );
  } catch (err) {
    console.log(err);
  }
};

const fetchWithoutParameter = async (endpoint: string, requestOptions: {}) => {
  const response = await fetch(
    `${import.meta.env.VITE_REQUEST_URL}/${endpoint}`,
    requestOptions
  );
  return response.json();
};

const fetchWithParameter = async (
  endpoint: string,
  parameter: string,
  requestOptions: {}
) => {
  const response = await fetch(
    `${import.meta.env.VITE_REQUEST_URL}/${endpoint}/${parameter}`,
    requestOptions
  );
  return response.json();
};
