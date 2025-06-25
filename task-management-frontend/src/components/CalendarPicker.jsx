// Placeholder for a more complex calendar component
function CalendarPicker({ selectedDate, setSelectedDate }) {
  return (
    <input
      type="date"
      value={selectedDate}
      onChange={(e) => setSelectedDate(e.target.value)}
      className="w-full p-2 border rounded"
    />
  );
}

export default CalendarPicker;