const calculateBmi = (height: number, weight: number): number =>  {
    if (isNaN(height) || isNaN(weight) || height <= 0 || weight <= 0) {
      throw new Error('Invalid input values');
    }
  
    height = height / 100;
    const bmi = weight / (height * height);
    return Number(bmi.toFixed(2));
}
  
const bmiArgs = process.argv.slice(2);
const height: number = Number(bmiArgs[0]);
const weight: number = Number(bmiArgs[1]);
  
try {
  const bmi: number = calculateBmi(height, weight);
  if (bmi < 16) {
    console.log("Underweight (Severe thinness)");
  } else if (bmi < 17) {
    console.log("Underweight (Moderate thinness)");
  } else if (bmi < 18.5) {
    console.log("Underweight (Mild thinness)");
  } else if (bmi < 25) {
    console.log("Normal range");
  } else if (bmi < 30) {
    console.log("Overweight (Pre-obese)");
  } else if (bmi < 35) {
    console.log("Obese (Class I)");
  } else if (bmi < 40) {
    console.log("Obese (Class II)");
  } else if (bmi >= 40) {
    console.log("Obese (Class III)");
  }
} catch (e) {
  console.error(e.message);
}