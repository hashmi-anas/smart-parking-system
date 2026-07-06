import axios from "axios";
import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import { useAuth } from "./AuthContext";

const BookingContext = createContext();

const API = "http://localhost:5000";

export function BookingProvider({ children }) {
  const { user } = useAuth();

  const [slots, setSlots] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [users, setUsers] = useState([]);

  const [stats, setStats] = useState({
    totalSlots: 0,
    availableSlots: 0,
    occupiedSlots: 0,
    totalBookings: 0,
    totalUsers: 0,
  });

  // ===========================
  // Load Slots
  // ===========================
  const loadSlots = async () => {
    try {
      const res = await axios.get(`${API}/slots`);
      setSlots(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  // ===========================
  // Load Bookings
  // ===========================
  const loadBookings = async () => {
    try {
      if (user?.role === "admin") {
        const res = await axios.get(`${API}/bookings`);
        setBookings(res.data);
      } else if (user?._id) {
        const res = await axios.get(
          `${API}/bookings/user/${user._id}`
        );
        setBookings(res.data);
      } else {
        setBookings([]);
      }
    } catch (err) {
      console.log(err);
    }
  };

  // ===========================
  // Load Dashboard Stats
  // ===========================
  const loadStats = async () => {
    try {
      const res = await axios.get(`${API}/admin/stats`);
      setStats(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  // ===========================
  // Load Users
  // ===========================
  const loadUsers = async () => {
    try {
      const res = await axios.get(`${API}/admin/users`);
      setUsers(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    loadSlots();
    loadStats();
  }, []);

  useEffect(() => {
    loadBookings();

    if (user?.role === "admin") {
      loadUsers();
      loadStats();
    }
  }, [user]);

  // ===========================
  // Book Slot
  // ===========================
  const bookSlot = async (bookingData) => {
    try {
      const res = await axios.post(
        `${API}/book`,
        bookingData
      );

      await loadSlots();
      await loadBookings();
      await loadStats();

      return res.data.booking;
    } catch (err) {
      alert(
        err.response?.data?.message ||
          "Booking failed."
      );

      return null;
    }
  };

  // ===========================
  // Cancel Booking
  // ===========================
  const cancelBooking = async (bookingId) => {
    try {
      await axios.delete(
        `${API}/booking/${bookingId}`
      );

      await loadSlots();
      await loadBookings();
      await loadStats();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <BookingContext.Provider
      value={{
        slots,
        bookings,
        users,
        stats,
        bookSlot,
        cancelBooking,
        loadStats,
        loadUsers,
        loadBookings,
      }}
    >
      {children}
    
    
    </BookingContext.Provider>
  );
}

export function useBooking() {
  return useContext(BookingContext);
}