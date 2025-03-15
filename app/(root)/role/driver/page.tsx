"use client"
import React from 'react'
import axios from 'axios'
import { useEffect, useState } from "react";
import { useSocket } from "../../../../Hooks/UseSocket"; // Import your socket hook




const Page = () => {
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


  interface RideRequest {
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
    pickupLocation: string;
    destination: string;
  }
  const socket = useSocket();
  const [loading, setLoading] = useState(false);
  const [rideRequests, setRideRequests] = useState<RideRequest | null>(null);
  const [updatedrideData, setUpdatedRideData] = useState<RideDataType | null>(null);


  useEffect(() => {
    console.log('driver page')
    if (!socket) return;
  console.log('listening for ride requests')
  
    // Listen for new ride requests
    socket.on("new_ride_request", (rideData) => {
      console.log("New ride request:", rideData);
      setRideRequests(rideData)
    });

    // socket.on("ride_accepted", (text) => {
    //   console.log('hi')
    //   console.log("accepted ride info: ", text);
    // });

    return () => {
      socket.off("new_ride_request"); // Cleanup on unmount
    };
  }, [socket]);



  // Function to accept a ride
  async function acceptRide() {
    setLoading(true)
    const userId = localStorage.getItem("userId"); // Get driver ID from storage
    const role = localStorage.getItem("role");
    try {
      console.log('trigerred')
      if (role === "driver" && userId && rideRequests) {
        const response = await axios.post("https://shuttlelink-backend.onrender.com/api/ride/ride-accepted", {
          rideId: rideRequests._id,
          userId,
          passengerId: rideRequests.passenger._id
        }, {
          withCredentials: true // 🔥 Allows sending & receiving cookies
        });

        console.log(response.data.message, response.data.status);
        setUpdatedRideData(response.data.updatedRide)
      };
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className='flex justify-center items-center min-h-screen bg-white'>
      {updatedrideData ? (
        <div className='w-full max-w-md p-6'>
          <div className='p-4 rounded-md border bg-slate-50 text-black'>
            <p className='text-black mb-2'>Passenger: {updatedrideData.passenger.firstname}</p>
            <p className='text-black mb-2'>Passenger&apos;s s Phonenumber: {updatedrideData.passenger.phoneNumber}</p>
            <p className='text-black mb-2'>Pickup: {updatedrideData.pickupLocation}</p>
            <p className='text-black mb-2'>Destination: {updatedrideData.destination}</p>
            <p className='text-black mb-2'>Status: {updatedrideData.status}</p>
            <p className='text-black mb-2'>Fare: {updatedrideData.fare}</p>
            <button className='bg-green-600 w-full rounded-sm justify-self-center  text-stone-200 p-2' onClick={acceptRide}>
              ride confirmed
            </button>
          </div>
        </div>
      ) : (
        <>
          {rideRequests ? (
            <div className='w-full max-w-md p-6'>
              <div className='w-full'>
                <div className='p-4 rounded-md border bg-slate-50 text-black'>
                  <p className='text-black mb-2'>Name: {rideRequests.passenger.firstname}</p>
                  <p className='text-black mb-2'>Phonenumber: {rideRequests.passenger.phoneNumber}</p>
                  <p className='text-black mb-2'>Pickup: {rideRequests.pickupLocation}</p>
                  <p className='text-black mb-2'>Destination: {rideRequests.destination}</p>
                  <button className='bg-black w-full rounded-sm justify-self-center  text-stone-200 p-2' onClick={acceptRide}>
                    {loading ? 'accepting...' : 'Accept ride'}
                  </button>
                </div>

              </div>
            </div>
          ) : (
            <div className='text-black text-center'>
              No ride requests
            </div>
          )}
        </>
      )}

    </div>
  )
}

export default Page