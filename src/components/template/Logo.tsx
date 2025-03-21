export default function Logo(){
    return (
        <div className={`
            bg-white 
            h-12 w-12
            rounded-full
            flex flex-col
            items-center justify-center
        `}>
            <div className={`h-3 w-3 rounded-full bg-red-600`}></div>
            <div className="flex mt-0.5">
                <div className="h-3 w-3 rounded-full bg-yellow-500 mr-0.5"></div>
                <div className="h-3 w-3 rounded-full bg-green-500 ml-0.5"></div>
            </div>
        </div>
    )
}