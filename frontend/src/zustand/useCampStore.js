// zustand/useCampStore.js
import { create } from "zustand";

const useCampStore = create((set) => ({
  camps: [],
  hostCamps: [],
  selectedCamp: null,
  favorites: [],
  bookings: [],

  setCamps: (camps) => set({ camps }),

  setHostCamps: (hostCamps) => set({ hostCamps }),

  setSelectedCamp: (selectedCamp) => set({ selectedCamp }),

  addCamp: (camp) =>
    set((state) => ({
      camps: [camp, ...state.camps],
      hostCamps: [camp, ...state.hostCamps],
    })),

  updateCamp: (updatedCamp) =>
    set((state) => ({
      camps: state.camps.map((camp) =>
        camp._id === updatedCamp._id ? updatedCamp : camp
      ),
      hostCamps: state.hostCamps.map((camp) =>
        camp._id === updatedCamp._id ? updatedCamp : camp
      ),
      selectedCamp:
        state.selectedCamp?._id === updatedCamp._id
          ? updatedCamp
          : state.selectedCamp,
    })),

  deleteCamp: (id) =>
    set((state) => ({
      camps: state.camps.filter((camp) => camp._id !== id),
      hostCamps: state.hostCamps.filter((camp) => camp._id !== id),
      selectedCamp: state.selectedCamp?._id === id ? null : state.selectedCamp,
    })),

  setFavorites: (favorites) => set({ favorites }),

  addFavorite: (camp) =>
    set((state) => ({
      favorites: [camp, ...state.favorites],
    })),

  removeFavorite: (campId) =>
    set((state) => ({
      favorites: state.favorites.filter((camp) => camp._id !== campId),
    })),

  setBookings: (bookings) => set({ bookings }),

  addBooking: (booking) =>
    set((state) => ({
      bookings: [booking, ...state.bookings],
    })),

  clearCampStore: () =>
    set({
      camps: [],
      hostCamps: [],
      selectedCamp: null,
      favorites: [],
      bookings: [],
    }),
}));

export default useCampStore;
