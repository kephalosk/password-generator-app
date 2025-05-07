const preventZeroAsDivisor = (divisor: number): number => {
  return divisor === 0 ? 1 : divisor;
};

export default preventZeroAsDivisor;
