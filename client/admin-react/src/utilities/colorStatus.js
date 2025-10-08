
export const colorStatus = (status) => {

    const percentageString = status.toString().replace("%", "").trim();
    const percentage = Number(percentageString);

    if (isNaN(percentage)) {

        console.error("Invalid status percentage provided to getStatusColor:", status);
        return "bg-gray-400";
    }


    if (percentage < 10) {
        return "bg-red-700";
    }

    else if (percentage >= 10 && percentage <= 70) {
        return "bg-orange-400";
    }

    else {
        return "bg-green-700";
    }
};