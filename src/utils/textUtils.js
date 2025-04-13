export const truncateText = (text, maxLength = 117) => {
    if (text.length > maxLength) {
        return text.slice(0, maxLength) + "...";
    }
    return text;
};