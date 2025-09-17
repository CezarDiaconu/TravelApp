import React from "react";

function BookingModal({ isOpen, onClose, onConfirm }) {
  const [arrivalDate, setArrivalDate] = useState('');
  const [departureDate, setDepartureDate] = useState('');
  const [numPersons, setNumPersons] = useState(1);

  const handleConfirm = () => {
    onConfirm({ arrivalDate, departureDate, numPersons });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h3>Booking Details</h3>
        <label>Arrival Date:</label>
        <input type="date" value={arrivalDate} onChange={(e) => setArrivalDate(e.target.value)} />

        <label>Departure Date:</label>
        <input type="date" value={departureDate} onChange={(e) => setDepartureDate(e.target.value)} />

        <label>Number of Persons:</label>
        <input type="number" min="1" value={numPersons} onChange={(e) => setNumPersons(e.target.value)} />

        <button onClick={handleConfirm}>Confirm</button>
        <button onClick={onClose}>Cancel</button>
      </div>
    </div>
  );
}

export default BookingModal;