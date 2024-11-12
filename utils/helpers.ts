export const users = Array.from({ length: 20 }, (_, index) => {
  const userNumber = Math.floor(Math.random() * 50) + 1; // Random number between 1 and 50
  return {
    username: `user${index + 1}`,
    xp: Math.floor(Math.random() * 3000), // Random XP between 0 and 3000
    imageUrl: `https://i.pravatar.cc/60?user=user_${userNumber}`,
  };
});
