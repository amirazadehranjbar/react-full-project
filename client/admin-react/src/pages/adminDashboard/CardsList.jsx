import Card from "./Card.jsx";

function CardsList() {
    return (
        <div className="flex justify-between items-center flex-wrap w-full
        p-2">
            <Card/>
            <Card/>
            <Card/>
            <Card/>
        </div>
    )
}

export default CardsList
