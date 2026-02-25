const mongoose = require('mongoose');

const mealSchema = new mongoose.Schema({
  time: { type: String, required: true },
  meal: { type: String, required: true },
  calories: { type: Number, required: true },
  macros: {
    protein: Number,
    carbs: Number,
    fats: Number
  }
}, { _id: false });

const workoutDaySchema = new mongoose.Schema({
  day: String,
  focus: String,
  volume: String,
  exercises: [{
    name: String,
    sets: Number,
    reps: String,
    rest: String
  }]
}, { _id: false });

const userSchema = new mongoose.Schema({
  fullName: { type: String, required: true, trim: true },
  email: { type: String, required: true, unique: true, lowercase: true },
  password: { type: String, required: true },
  height: { type: Number, required: true },
  weight: { type: Number, required: true },
  bmi: { type: Number, required: true },
  sport: { type: String, required: true },
  level: { type: String, enum: ['Amateur', 'HighPerformance'], required: true },
  goal: {
    type: String,
    enum: ['Physical Conditioning', 'Muscle Gain', 'Weight Loss', 'Bodybuilding Preparation', 'Sport Performance'],
    required: true
  },
  profession: String,
  workStart: String,
  workEnd: String,
  breakIntervals: String,
  weightHistory: [{
    value: Number,
    date: { type: Date, default: Date.now }
  }],
  dietPlan: {
    bmr: Number,
    tdee: Number,
    targetCalories: Number,
    macros: {
      protein: Number,
      carbs: Number,
      fats: Number
    },
    meals: [mealSchema]
  },
  workoutPlan: {
    split: String,
    days: [workoutDaySchema]
  },
  sleepSchedule: {
    recommendedSleepHours: Number,
    bedtime: String,
    wakeTime: String,
    mealWindow: String
  },
  subscriptionStatus: { type: String, enum: ['inactive', 'trialing', 'active'], default: 'inactive' },
  stripeCustomerId: String,
  stripeSubscriptionId: String,
  role: { type: String, enum: ['user', 'admin'], default: 'user' }
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
