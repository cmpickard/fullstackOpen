type Operation = 'add' | 'multiply' | 'divide' | 'subtract';

function operate(num1: number, num2: number, opp: Operation): number {
  switch (opp) {
    case 'add':
      return num1 + num2;
    case 'subtract':
      return num1 - num2;
    case 'divide':
      return num1 / num2;
    case 'multiply':
      return num1 * num2;
    default:
      throw new Error();
  }
}
console.log(operate(10, 2, 'add'));
console.log(operate(10, 2, 'multiply'));
console.log(operate(10, 2, 'subtract'));
console.log(operate(10, 2, 'divide'));
