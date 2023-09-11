// components/HackathonCalendar.tsx
import { format, isSameDay } from 'date-fns';
import { WithId } from 'mongodb';

import clientPromise from '@/lib/db';
import { EventModel } from '@/lib/db/models/Event';
import logger from '@/lib/logger';

export async function getEvents(): Promise<WithId<EventModel>[] | undefined> {
  try {
		const client = await clientPromise
		const events = await client.db()
			.collection<EventModel>('events')
			.find()
			.toArray()
    
		return events
  } catch (error) {
    logger.error(error);
  }
}

interface HackathonCalendarProps {
  startDate: Date;
  endDate: Date;
  events: WithId<EventModel>[] | undefined;
}

 export function HackathonCalendar({ startDate, endDate, events }: HackathonCalendarProps) {
  const eventsForBothDays = events?.filter(event =>
    isSameDay(new Date(event.date), startDate) || isSameDay(new Date(event.date), endDate)
  );
  return (
    <div className="container mx-auto p-8">
      <div className="grid md:grid-cols-2 grid-cols-1 gap-16">
        <div>
          <h2 className="text-xl font-semibold">{format(startDate, 'MMMM d, yyyy')}</h2>
          {eventsForBothDays?.map((event, index) => (
            isSameDay(new Date(event.date), startDate) && (
              <div key={index} className="border rounded p-4 mb-2">
                <h3 className="text-sm break-words">{event.title}</h3>
                <p className="text-blue-600">
                  {format(new Date(event.date), 'h:mm a')}
                </p>
              </div>
            )
          ))}
        </div>
        <div>
          <h2 className="text-xl font-semibold">{format(endDate, 'MMMM d, yyyy')}</h2>
          {eventsForBothDays?.map((event, index) => (
            isSameDay(new Date(event.date), endDate) && (
              <div key={index} className="border rounded p-4 mb-2">
                <h3 className="text-sm break-words">{event.title}</h3>
                <p className="text-blue-600">
                  {format(new Date(event.date), 'h:mm a')}
                </p>
              </div>
            )
          ))}
        </div>
      </div>
    </div>
  );
};

