// client/admin-react/src/pages/user/userBag/components/EmptyCart.jsx

function EmptyCart() {
    return (
        <div className="flex flex-col justify-center items-center min-h-screen bg-gray-50">
            <div className="text-2xl font-semibold text-gray-700 mb-4">
                Your bag is empty
            </div>

            <a
            href="/api/user"
            className="text-indigo-600 hover:text-indigo-500 font-medium">

            Continue Shopping →
            </a>
        </div>

);
}

export default EmptyCart;
