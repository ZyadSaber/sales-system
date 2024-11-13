import { memo } from "react"
import { Link } from "react-router-dom"

const NotFoundPage = () => (
    <div className="h-screen flex flex-col items-center justify-center bg-gray-100">
        <h1 className="text-9xl font-bold text-gray-800">404</h1>
        <p className="text-2xl font-medium text-gray-600 mt-4">Page not found</p>
        <Link to="/" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-8">Go Home</Link>
    </div>
)

export default memo(NotFoundPage)