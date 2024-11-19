export const users = Array.from({ length: 20 }, (_, index) => {
  const userNumber = Math.floor(Math.random() * 50) + 1; // Random number between 1 and 50
  return {
    username: `user${index + 1}`,
    xp: Math.floor(Math.random() * 3000), // Random XP between 0 and 3000
    imageUrl: `https://i.pravatar.cc/60?user=user_${userNumber}`,
  };
});

export const getPaymentData = async () => {
  try {
    const { customer, ephemeralKey, clientSecret } = await fetch(
      "http://192.168.43.23:8000/stripe/payment-intent",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      }
    ).then((res) => res.json());
    return {
      customer: customer as string,
      ephemeralKey: ephemeralKey as string,
      clientSecret: clientSecret as string,
    };
  } catch (error: any) {
    console.log(error);
  }
  return { customer: "", ephemeralKey: "", clientSecret: "" };
};

export const url = "http://192.168.43.23:8000";
