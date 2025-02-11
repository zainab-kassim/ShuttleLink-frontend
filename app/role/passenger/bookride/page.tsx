"use client";
import { ChangeEvent, FormEvent, useState } from "react";
import axios from "axios";


const bookride = () => {
  const [formData, setFormData] = useState({
    pickupLocation: "",
    destination: "",
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:4000/ride/book-ride",{
        pickupLocation: formData.pickupLocation,
        destination: formData.destination,
      });
      console.log("Ride booked successfully:", response.data);
    } catch (error) {
      console.error("Error booking ride:", error);
    }
  };

  return (
    <div className="max-w-md text-black mx-auto mt-10 p-5 border rounded-lg shadow-lg">
      <h2 className="text-xl font-bold mb-4">Book a Ride</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="pickupLocation"
          placeholder="Pickup Location"
          value={formData.pickupLocation}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded"
        />
        <input
          type="text"
          name="destination"
          placeholder="Destination"
          value={formData.destination}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded"
        />

        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
        >
          Book Ride
        </button>
      </form>
    </div>
  );
};

export default bookride;
