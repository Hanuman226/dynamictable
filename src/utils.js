export const sortAsec = (data) => data.sort((a, b) => a?.items[0].toLowerCase().localeCompare(b?.items[0].toLowerCase()));
export const sortDesc = (data) => data.sort((a, b) => b?.items[0].toLowerCase().localeCompare(a?.items[0].toLowerCase()));

export const validateData = (data) => data.trim().toLowerCase();

// Removes period, comma, spaces from data
const regex = /[.,\s]/g;
export const sanitizeData = (data) => data.replace(regex, '')