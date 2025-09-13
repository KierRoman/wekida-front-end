// src/components/Dashboard/Dashboard.jsx

import { useEffect, useState } from "react";
import { Link } from "react-router";
import * as eventService from "../../services/eventService"; // Import eventService for API calls

const Dashboard = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      const eventsData = await eventService.index();
      console.log("eventsData:", eventsData);
      setEvents(eventsData);
    };
    fetchEvents();
  }, []);

  // Function to handle event cancellation
  const handleCancelEvent = async (eventId) => {
    try {
      await eventService.deleteEvent(eventId);
      setEvents(events.filter((event) => event._id !== eventId));
      console.log("Event canceled successfully");
    } catch (error) {
      console.error("Error canceling event:", error);
    }
  };

  return (
    <div className="mx-8 mt-8">
      <div className="bg-[#E7F6FF] p-6 rounded-2xl">
        <h2 className="text-[#3758F9] text-2xl font-bold">Your Ultimate Event Planning Companion</h2>
        <p className="font-bold mt-8">Create and Manage</p>
        <p className="mt-4 mb-8">
          Whether you're organizing a small gathering or a grand celebration, Wekida is here to make your planning
          process seamless and enjoyable.
        </p>
        <Link to="/events/create" className="px-6 py-2 bg-[#3758F9] rounded text-white">
          Add an Event
        </Link>
      </div>

      {/* Display events or a message if there are no events */}
      {events.length === 0 ? (
        <div className="border-l-[#3758F9] border-l-[4px] px-4 mt-12">
          <h2 className="font-bold text-xl">No Events</h2>
          <p>Your event calendar is a blank canvas.</p>
        </div>
      ) : (
        <>
          <div className="border-l-[#3758F9] border-l-[4px] px-4 mt-12">
            <h2 className="font-bold text-xl">Upcoming Events</h2>
            <p>Click on individual events for more information.</p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mt-8">
            {events.map((event) => (
              <div key={event._id} className="shadow-md hover:shadow-lg rounded-md p-4">
                <p className="font-bold text-xl">{event.event_title}</p>
                <p className="text-gray-700 mt-4">{event.description} </p>
                <Link to={`/events/preview/${event._id}`} className="mt-8 block">
                  See Event Overview <i className="fa-solid fa-circle-arrow-right text-lg ml-2"></i>
                </Link>
                <button onClick={() => handleCancelEvent(event._id)} className="text-gray-500 mt-6 block">
                  Cancel Event <i className="fa-solid fa-trash text-lg ml-2"></i>
                </button>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Dashboard;
