const goalAdjustments = {
  'Physical Conditioning': 0,
  'Muscle Gain': 300,
  'Weight Loss': -400,
  'Bodybuilding Preparation': -250,
  'Sport Performance': 250
};

const macroByGoal = {
  'Physical Conditioning': { protein: 0.3, carbs: 0.4, fats: 0.3 },
  'Muscle Gain': { protein: 0.3, carbs: 0.5, fats: 0.2 },
  'Weight Loss': { protein: 0.4, carbs: 0.3, fats: 0.3 },
  'Bodybuilding Preparation': { protein: 0.45, carbs: 0.3, fats: 0.25 },
  'Sport Performance': { protein: 0.3, carbs: 0.55, fats: 0.15 }
};

const activityMultiplier = {
  Amateur: 1.5,
  HighPerformance: 1.85
};

const generateDiet = (user) => {
  const bmr = 10 * user.weight + 6.25 * user.height - 5 * 30 + 5;
  const tdee = bmr * (activityMultiplier[user.level] || 1.4);
  const targetCalories = Math.round(tdee + goalAdjustments[user.goal]);

  const split = macroByGoal[user.goal] || macroByGoal['Physical Conditioning'];
  const protein = Math.round((targetCalories * split.protein) / 4);
  const carbs = Math.round((targetCalories * split.carbs) / 4);
  const fats = Math.round((targetCalories * split.fats) / 9);

  const baseMeals = user.level === 'HighPerformance'
    ? ['06:00', '09:00', '12:00', '15:30', '19:00', '22:00']
    : ['07:00', '10:00', '13:00', '17:00', '20:00'];

  const mealCalories = Math.round(targetCalories / baseMeals.length);

  const meals = baseMeals.map((time, idx) => ({
    time,
    meal: `Meal ${idx + 1}: lean protein + complex carbs + vegetables`,
    calories: mealCalories,
    macros: {
      protein: Math.round(protein / baseMeals.length),
      carbs: Math.round(carbs / baseMeals.length),
      fats: Math.round(fats / baseMeals.length)
    }
  }));

  return { bmr: Math.round(bmr), tdee: Math.round(tdee), targetCalories, macros: { protein, carbs, fats }, meals };
};

module.exports = generateDiet;
