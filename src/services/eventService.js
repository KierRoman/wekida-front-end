// src/services/eventService.js

const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/events`;

// function is called from the Dashboard page
const index = async () => {
  try {
    const res = await fetch(BASE_URL, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) {
      throw new Error(`Server error: ${res.status}`);
    };

    return await res.json();
  } catch (err) {
    console.log(err);
  };
};

// function is called from Preview Event page
const show = async (eventId) => {
  try {
    // console.log("eventId:", eventId);

    // console.log("Token being sent:", localStorage.getItem("token"));

    const res = await fetch(`${BASE_URL}/${eventId}`, {
      method: "GET",
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });

    if (!res.ok) {
      throw new Error(`Server error: ${res.status}`);
    };

    return await res.json();
  } catch (err) {
    console.log(err);
  };
};

// function is called from Create Event page
const create = async (eventData) => {
  try {
    const res = await fetch(BASE_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(eventData),
    });

    if (!res.ok) {
      throw new Error(`Server error: ${res.status}`);
    };

    return await res.json();
  } catch (err) {
    console.log(err);
    throw err;
  };
};

// function is called from Edit Event page
const update = async (eventId, eventData) => {
  try {
    const res = await fetch(`${BASE_URL}/${eventId}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(eventData),
    });

    if (!res.ok) {
      throw new Error(`Server error: ${res.status}`);
    };

    return await res.json();
  } catch (err) {
    console.log(err);
    throw err;
  };
};

const deleteEvent = async (eventId) => {
  try {
    const res = await fetch(`${BASE_URL}/${eventId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) {
      throw new Error(`Server error: ${res.status}`);
    };

    return await res.json();
  } catch (err) {
    console.log(err);
    throw err;
  };
};

export { index, show, create, update, deleteEvent };
