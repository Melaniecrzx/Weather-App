export default function Loading() {
    return (
        <div className="flex justify-center items-center h-screen">
            <div className="flex justify-between w-20"> 
                <div className="w-4 h-4 bg-blue-500 rounded-full animate-grow-shrink  [animation-delay:0s]"></div>
                <div className="w-4 h-4 bg-blue-500 rounded-full animate-grow-shrink  [animation-delay:0,5s]"></div>
                <div className="w-4 h-4 bg-blue-500 rounded-full animate-grow-shrink  [animation-delay:1s]"></div>
            </div>
        </div>
    )
}