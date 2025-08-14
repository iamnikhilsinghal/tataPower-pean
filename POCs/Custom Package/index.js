function simpleInterest(p, r, t) {
  const si = (p * r * t) / 100;
  return `Simple Intrest is: ${si}`;
}

module.exports = { simpleInterest };
