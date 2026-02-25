const generateSleepSchedule = (user) => {
  const recommendedSleepHours = user.level === 'HighPerformance' ? 8.5 : 7.5;
  const wakeTime = user.workStart || '07:00';
  const [h, m] = wakeTime.split(':').map(Number);
  const wakeMinutes = h * 60 + (m || 0);
  const bedMinutes = (wakeMinutes - Math.round(recommendedSleepHours * 60) + 1440) % 1440;
  const bedHour = String(Math.floor(bedMinutes / 60)).padStart(2, '0');
  const bedMin = String(bedMinutes % 60).padStart(2, '0');

  const mealWindow = user.workStart && user.workEnd
    ? `${user.workStart} - ${user.workEnd} (prefer meals every 3-4h)`
    : '08:00 - 20:00 (default eating window)';

  return {
    recommendedSleepHours,
    bedtime: `${bedHour}:${bedMin}`,
    wakeTime,
    mealWindow
  };
};

module.exports = generateSleepSchedule;
