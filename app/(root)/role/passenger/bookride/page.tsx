"use client";
import { ChangeEvent, FormEvent, useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import { useSocket } from "../../../../../Hooks/UseSocket"; // Import your socket hook
import icon1 from '../../../../../public/suttle link icon.jpg'
import Image from "next/image";

const Bookride = () => {
  type RideDataType = {
    _id: string;
    passenger: {
      _id: string;
      firstname: string;
      lastname: string;
      email: string;
      phoneNumber: string;
      role: string;
      createdAt: string;
    };
    driver: {
      _id: string;
      firstname: string;
      lastname: string;
      email: string;
      phoneNumber: string;
      role: string;
      createdAt: string;
    };
    pickupLocation: string;
    destination: string;
    status: string;
    fare: number;
    createdAt: string;
    updatedAt: string;
  };

  const socket = useSocket()

  const [RideData, setRideData] = useState<RideDataType | null>(null)

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
      const response = await axios.post("https://shuttlelink-backend.onrender.com/api/ride/book-ride", {
        pickupLocation: formData.pickupLocation,
        destination: formData.destination,
      }, {
        withCredentials: true // 🔥 Allows sending & receiving cookies
      });
      console.log("Ride booked successfully:", response);
    } catch (error) {
      console.error("Error booking ride:", error);
    }
  };

  
  useEffect(() => {
    if (!socket) return;

    // Listening
    socket.on("ride_accepted", (updatedRide) => {
      console.log("ride accepted to passenger", updatedRide);
      setRideData(updatedRide)
    });

    return () => {
      socket.off("ride_accepted"); // Cleanup on unmount
    };
  }, [socket]);


  return (
    <div className=" text-black flex items-center p-5 border rounded-lg shadow-lg min-h-screen bg-white justify-center">
      {RideData ? (
      <div className='w-full max-w-md p-6'>
          <div className='p-4 rounded-md border bg-slate-50 text-black'>
            <p className='text-black mb-2'>Driver: {RideData.driver.firstname}</p>
            <p className='text-black mb-2'>Driver&apos;s s Phonenumber: {RideData.driver.phoneNumber}</p>
            <p className='text-black mb-2'>Pickup: {RideData.pickupLocation}</p>
            <p className='text-black mb-2'>Destination: {RideData.destination}</p>
            <p className='text-black mb-2'>Status: {RideData.status}</p>
            <p className='text-black mb-2'>Fare: {RideData.fare}</p>
            <button className='bg-green-600 w-full rounded-sm justify-self-center  text-stone-200 p-2'>
              ride booked successffully
            </button>
          </div>
        </div>
      ) : (
          <div className="w-full max-w-md p-6">
            <Image className='rounded-full justify-self-center h-[100px] w-[100px] mb-2' alt='icon' src={icon1} height={100} width={100} />
            <h2 className="text-xl font-bold  text-center">Book a Ride</h2>
            <h5 className='mb-14 font-medium text-sm text-center text-gray-400'>where to ?</h5>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                name="pickupLocation"
                placeholder="Pickup Location"
                value={formData.pickupLocation}
                onChange={handleChange}
                required
                className="w-full border rounded-full bg-slate-50  p-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />

              <input
                type="text"
                name="destination"
                placeholder="Destination"
                value={formData.destination}
                onChange={handleChange}
                required
                className="w-full border  rounded-full bg-slate-50  p-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <div className="mb-10"></div>


              <button
                type="submit"
                className="w-full font-medium rounded-full bg-blue-600 p-4 text-white hover:bg-blue-700"
              >
                Book Ride
              </button>
            </form>
          </div>
      )}
    </div>
  );
};

export default Bookride;