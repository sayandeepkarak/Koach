function generateOtp(digit) {
  const numbers = "987132546";
  let otp = "";
  for (let i = 1; i <= digit; i++) {
    let random = Math.floor(Math.random() * 9);
    otp += numbers.charAt(random);
  }
  return otp;
}

export { generateOtp };
