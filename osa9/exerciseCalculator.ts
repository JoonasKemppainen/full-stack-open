interface Result {
    periodLength: number;
    trainingDays: number;
    success: boolean;
    rating: number;
    ratingDescription: string;
    target: number;
    average: number;
  }
  
function calculateExercises(dailyHours: number[], target: number): Result {
  if (!dailyHours || !dailyHours.length || isNaN(target)) {
    throw new Error('Invalid input values');
  }
  const periodLength = dailyHours.length;
  const trainingDays = dailyHours.filter(hours => hours > 0).length;
  const totalHours = dailyHours.reduce((sum, hours) => sum + hours);
  const average = totalHours / periodLength;
  const success = average >= target;
  const rating = success 
      ? 3 
      : average >= target - 1 
      ? 2 
      : 1;
  const ratingDescription = rating === 3 
      ? 'great' 
      : rating === 2 
      ? 'not too bad but could be better' 
      : 'need to improve';
  return {
    periodLength,
    trainingDays,
    success,
    rating,
    ratingDescription,
    target,
    average,
  };
}

const exerciseArgs = process.argv.slice(2);
const target: number = Number(exerciseArgs[0]);
const dailyHours: number[] = exerciseArgs.slice(1).map(Number);

try {
  const result: Result = calculateExercises(dailyHours, target);
  console.log(result);
} catch (e) {
  console.error(e.message);
}