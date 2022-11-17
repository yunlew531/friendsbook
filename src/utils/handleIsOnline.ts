const handleIsOnline = (lastSeen?: number) => {
  if (!lastSeen) return false;
  const tenMinutes = 10 * 60 * 1000;
  const isLessThanTenMinutes = tenMinutes > Date.now() - (lastSeen * 1000);
  return isLessThanTenMinutes;
};

export default handleIsOnline;
