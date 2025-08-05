// Format a date string (ISO or Date object) to 'dd/mm/yyyy'
export const formatDate = (dateInput) => {
  if (!dateInput) return "-";

  const date = new Date(dateInput);
  return date.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
};

// Format a datetime string to 'dd/mm/yyyy, hh:mm:ss'
export const formatDateTime = (dateInput) => {
  if (!dateInput) return "-";

  const date = new Date(dateInput);
  return date.toLocaleString("en-GB", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
};
