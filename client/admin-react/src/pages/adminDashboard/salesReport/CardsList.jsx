import Card from "./Card.jsx";

function CardsList() {
    return (
        // Responsive grid: 1 column on mobile, 2 on tablet, 4 on desktop
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 w-full p-2">
            <Card/>
            <Card/>
            <Card/>
            <Card/>
        </div>
    )
}

export default CardsList
