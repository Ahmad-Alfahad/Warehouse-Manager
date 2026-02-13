const STORAGE_KEY = "lastEvents";
const MAX_EVENTS = 20;

interface StoredEvent {
  id: number;
  type: string;
  message: string;
  date: number;
}

export function getEvents(): StoredEvent[] {
  if (typeof window === "undefined") return [];
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [];
}

export function addEvent({ type, message }: { type: string; message: string }) {
  if (typeof window === "undefined") return;

  const events = getEvents();

  const newEvent: StoredEvent = {
    id: Date.now(),
    type, // add | edit | delete | import
    message,
    date: Date.now(),
  };

  const updatedEvents = [newEvent, ...events].slice(0, MAX_EVENTS);

  localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedEvents));
}

export function clearEvents() {
  localStorage.removeItem(STORAGE_KEY);
}
