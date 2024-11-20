module.exports = {
    formatDate: (date) => {
        // Check if the date is valid before formatting
        if (!date) {
            return '';
        }
        return date.toLocaleDateString();
    },
};
