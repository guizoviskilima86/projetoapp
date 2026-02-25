const workoutTemplates = {
  'Physical Conditioning': ['Full Body', 'Cardio + Core', 'Upper Body', 'Lower Body', 'Mobility'],
  'Muscle Gain': ['Chest/Triceps', 'Back/Biceps', 'Legs', 'Shoulders', 'Accessory'],
  'Weight Loss': ['HIIT Full Body', 'Lower + Cardio', 'Upper + Core', 'Circuit', 'Cardio Endurance'],
  'Bodybuilding Preparation': ['Push', 'Pull', 'Legs', 'Upper Hypertrophy', 'Lower Hypertrophy', 'Posing/Cardio'],
  'Sport Performance': ['Strength', 'Speed', 'Power', 'Conditioning', 'Mobility/Recovery']
};

const generateWorkout = (user) => {
  const splitDays = workoutTemplates[user.goal] || workoutTemplates['Physical Conditioning'];
  const isHighPerformance = user.level === 'HighPerformance';

  const days = splitDays.map((focus, index) => ({
    day: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][index],
    focus,
    volume: isHighPerformance ? 'High' : 'Moderate',
    exercises: [
      { name: `${focus} Exercise 1`, sets: isHighPerformance ? 5 : 3, reps: user.goal === 'Weight Loss' ? '12-15' : '8-12', rest: isHighPerformance ? '60-90s' : '90-120s' },
      { name: `${focus} Exercise 2`, sets: isHighPerformance ? 4 : 3, reps: user.goal === 'Sport Performance' ? '4-6 explosive' : '10-12', rest: '90s' },
      { name: `${focus} Exercise 3`, sets: 3, reps: '12-15', rest: '60s' }
    ]
  }));

  return { split: `${splitDays.length}-day weekly split`, days };
};

module.exports = generateWorkout;
