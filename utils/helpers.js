module.exports = {
    // Function to format a date in a human-readable format
    format_date: (date) => {
        // Options for formatting the date
        const options = {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
        };
        // Format date as Tuesday, January 16, 2024 at 11:30:33 PM
        return date.toLocaleTimeString("en-US", options);
    },

    // Helper function to determine equality of variables
    isEqual: (arg1, arg2) => {
        // Check if the two arguments are equal
        if (arg1 === arg2) {
            return true; // Return true if they are equal
        } else {
            return false; // Return false if they are not equal
        }
    }
};
