export const formatAddress = (address) => {
  if (!address) return '';
  return `${address.street}, ${address.city}, ${address.country}`;
};

export const getInitials = (name) => {
  if (!name) return '';
  return name.split(' ')
    .map(part => part[0])
    .join('')
    .toUpperCase();
};

export const debounce = (func, delay) => {
  let timeoutId;
  return function(...args) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      func.apply(this, args);
    }, delay);
  };
};

export const generateRandomColor = () => {
  const colors = [
    '#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A', 
    '#98D8C8', '#F06292', '#7986CB', '#9575CD'
  ];
  return colors[Math.floor(Math.random() * colors.length)];
};