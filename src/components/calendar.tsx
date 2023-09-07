// components/HackathonCalendar.tsx
import { format, isSameDay } from 'date-fns';
import React from 'react';

interface HackathonCalendarProps {
  startDate: Date;
  endDate: Date;
}

const hackathonEvents = [
    {
      title: 'Opening Ceremony',
      date: new Date('10/07/2023 06:00:00'),
    },
    {
      title: 'Workshop: Web Development',
      date: new Date('10/07/2023 08:00:00'),
    },
    {
      title: 'Workshop: Mobile App Development',
      date: new Date('10/07/2023 10:00:00'),
    },
    {
      title: 'Hackathon Kickoff',
      date: new Date('10/07/2023 12:00:00'),
    },
    {
      title: 'Hackathon Day 2',
      date: new Date('10/08/2023 06:00:00'),
    },
    {
      title: 'Workshop: AI and ML',
      date: new Date('10/08/2023 08:00:00'),
    },
    {
      title: 'Workshop: Cloud Computing',
      date: new Date('10/08/2023 10:00:00'),
    },
    {
      title: 'Hackathon Presentations',
      date: new Date('10/08/2023 12:00:00'),
    },
  ];

const HackathonCalendar: React.FC<HackathonCalendarProps> = ({ startDate, endDate }) => {
  const eventsForBothDays = hackathonEvents.filter(event =>
    isSameDay(event.date, startDate) || isSameDay(event.date, endDate)
  );

  return (
    <div className="container mx-auto p-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <h2 className="text-xl font-semibold">{format(startDate, 'MMMM d, yyyy')}</h2>
          {eventsForBothDays.map((event, index) => (
            isSameDay(event.date, startDate) && (
              <div key={index} className="border rounded p-4 mb-2">
                <h3 className="text-lg font-semibold">{event.title}</h3>
                <p className="text-gray-600">
                  {format(event.date, 'h:mm a')}
                </p>
              </div>
            )
          ))}
        </div>
        <div>
          <h2 className="text-xl font-semibold">{format(endDate, 'MMMM d, yyyy')}</h2>
          {eventsForBothDays.map((event, index) => (
            isSameDay(event.date, endDate) && (
              <div key={index} className="border rounded p-4 mb-2">
                <h3 className="text-lg font-semibold">{event.title}</h3>
                <p className="text-gray-600">
                  {format(event.date, 'h:mm a')}
                </p>
              </div>
            )
          ))}
        </div>
      </div>
    </div>
  );
};

export default HackathonCalendar;
