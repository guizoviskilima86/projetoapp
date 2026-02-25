const calculateBmi = (weightKg, heightCm) => {
  const heightM = heightCm / 100;
  return Number((weightKg / (heightM * heightM)).toFixed(2));
};

module.exports = calculateBmi;
