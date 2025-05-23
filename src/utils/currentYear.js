export function currentYear(id) {
    const date = new Date();
    const year = date.getFullYear('en-US');
    return document.getElementById(id).textContent = year;
};