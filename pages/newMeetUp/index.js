import React from "react";
import NewMeetupForm from "../../components/meetups/NewMeetupForm";

const NewMeetUp = () => {
  const addMeetUpHandler = async (enteredMeetUpData) => {
    try {
      const response = await fetch("/api/newMeetUpId", {
        method: "POST",
        body: JSON.stringify(enteredMeetUpData),
        headers: {
          "Content-Type": "application/json"
        }
      });
  
      const data = await response.json();
      console.log(data);
      
    } catch (error) {
      console.log(error.message);
    }
  }

  return <NewMeetupForm onAddMeetup={addMeetUpHandler} />;
};

export default NewMeetUp;
