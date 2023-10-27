import { test } from 'node:test';
import { strictEqual } from 'node:assert';

const dayStart = '07:30';
const dayEnd = '17:45';

function scheduleMeeting(startTime, durationMinutes) {
  const [startHour, startMinute] = startTime.split(':').map(Number);
  const endHour = startHour + Math.floor((startMinute + durationMinutes) / 60);
  const endMinute = (startMinute + durationMinutes) % 60;
  const [dayStartHour, dayStartMinute] = dayStart.split(':').map(Number);
  const [dayEndHour, dayEndMinute] = dayEnd.split(':').map(Number);
  const isStartOk = dayStartHour * 60 + dayStartMinute <= startHour * 60 + startMinute;
  const isEndOk = dayEndHour * 60 + dayEndMinute >= endHour * 60 + endMinute;
  return isStartOk && isEndOk;
}

test('scheduleMeeting', () => {
  strictEqual(scheduleMeeting('7:00', 15), false);
  strictEqual(scheduleMeeting('07:15', 30), false);
  strictEqual(scheduleMeeting('7:30', 30), true);
  strictEqual(scheduleMeeting('11:30', 60), true);
  strictEqual(scheduleMeeting('17:00', 45), true);
  strictEqual(scheduleMeeting('17:30', 30), false);
  strictEqual(scheduleMeeting('18:00', 15), false);
});
