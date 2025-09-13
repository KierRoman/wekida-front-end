// src/App.jsx

import { useState, useContext, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router";
import SignUpForm from "./components/SignUpForm/SignUpForm";
import SignInForm from "./components/SignInForm/SignInForm";
import Dashboard from "./components/Dashboard/Dashboard.jsx";
import * as eventService from "./services/eventService.js";
import { UserContext } from "./contexts/UserContext.jsx";

import "./App.css";
import NavBar from "./components/NavBar/NavBar.jsx";
import CreateEvent from "./components/CreateEvent/CreateEvent.jsx";
import PreviewEvent from "./components/PreviewEvent/PreviewEvent.jsx";
import EventConfirmation from "./components/EventConfirmation/EventConfirmation.jsx";
import EditEvent from "./components/EditEvent/EditEvent.jsx";

function App() {
  const { user } = useContext(UserContext);

  useEffect(() => {
    const fetchAllEvents = async () => {
      const eventsData = await eventService.index();
    };
    if (user) fetchAllEvents();
  }, []);

  if (user) {
    return (
      // <Router>
      <div className="App">
        <NavBar />
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/events/create" element={<CreateEvent />} />
          <Route path="/events/edit/:id" element={<EditEvent />} />
          <Route path="/events/preview/:id" element={<PreviewEvent />} />
          <Route path="/events/confirmation/:id" element={<EventConfirmation />} />
          <Route path="/*" element={<Dashboard />} />
        </Routes>
      </div>
      // </Router>
    );
  } else {
    return (
      <div className="App bg-[#DFE4EA] min-h-screen" >
        <div className="h-10"></div>
        <Routes>
          <Route path="/sign-up" element={<SignUpForm />} />
          <Route path="/sign-in" element={<SignInForm />} />
          {/* leaving a separate path for a future landing page */}
          <Route path="/*" element={<SignInForm />} />
        </Routes>
      </div>
    );
  };
};

export default App;
