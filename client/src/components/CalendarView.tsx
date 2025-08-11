

import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import "@fullcalendar/common/main.css";
import "@fullcalendar/daygrid/main.css";
import "@fullcalendar/timegrid/main.css";

interface Appointment {
  _id: string;
  date: string;   
  time: string;   
  status: string;
  user: { name: string };
  fee: number;
}

interface CalendarProps {
  appointments: Appointment[];
}

const CalendarView: React.FC<CalendarProps> = ({ appointments }) => {
  const events = appointments.map((app) => ({
    id: app._id,
    title: `${app.user.name} (${app.status})`,
    start: `${app.date}T${app.time}`,
    extendedProps: {
      fee: app.fee,
      status: app.status,
    },
  }));

  return (
    <div className="mb-6 bg-white p-4 rounded-lg shadow">
      <h2 className="text-lg font-semibold mb-4">Appointments Calendar</h2>
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        headerToolbar={{
          left: "prev,next today",
          center: "title",
          right: "dayGridMonth,timeGridWeek,timeGridDay",
        }}
        events={events}
        height="auto"
      />
    </div>
  );
};

export default CalendarView;
