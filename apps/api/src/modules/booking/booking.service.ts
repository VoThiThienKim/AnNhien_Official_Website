import { BUSINESS_RULES, type Booking, VI_MESSAGES } from "@an-nhien/shared";
import { bookings, nextId } from "../../data/store";
import { HttpError } from "../../http";

export interface CreateBookingInput {
  userId?: string;
  customerName: string;
  customerPhone: string;
  date: string;
  time: string;
  seats: number;
  tableId?: string;
  estimatedSpend?: number;
}

export function createBooking(input: CreateBookingInput) {
  const depositAmount =
    input.seats > BUSINESS_RULES.bookingDepositSeatThreshold
      ? input.estimatedSpend ?? input.seats * 150_000
      : 0;

  const booking: Booking = {
    id: nextId("booking"),
    userId: input.userId,
    customerName: input.customerName,
    customerPhone: input.customerPhone,
    date: input.date,
    time: input.time,
    seats: input.seats,
    tableId: input.tableId,
    depositAmount,
    status: depositAmount > 0 ? "pending" : "confirmed",
    createdAt: new Date().toISOString()
  };

  bookings.unshift(booking);
  return booking;
}

export function getAvailability(date: string, time: string) {
  const bookedSeats = bookings
    .filter((booking) => booking.date === date && booking.time === time && booking.status !== "cancelled")
    .reduce((total, booking) => total + booking.seats, 0);

  return {
    date,
    time,
    totalSeats: 48,
    bookedSeats,
    availableSeats: Math.max(0, 48 - bookedSeats)
  };
}

export function confirmBooking(bookingId: string) {
  const booking = bookings.find((item) => item.id === bookingId);

  if (!booking) {
    throw new HttpError(404, VI_MESSAGES.notFound);
  }

  booking.status = "confirmed";
  return booking;
}

