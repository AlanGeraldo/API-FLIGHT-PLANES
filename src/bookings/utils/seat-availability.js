export const validateRepeatSeat = (tickets) => {
  const seatNumbers = new Set();

  for (const ticket of tickets) {
    if (seatNumbers.has(ticket.seatNumber)) {
      return true;
    } else {
        seatNumbers.add(ticket.seatNumber)
    }
  }

  return false;
};

export const hasDuplicateSeatNumber = (dataFromBody, dataFromDb) => {

  const setOfSeatNumbers = new Set(dataFromDb.map((item) => item.seat_number))
  
  return dataFromBody.some((ticket) => setOfSeatNumbers.has(ticket.seatNumber))
}