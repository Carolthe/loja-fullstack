export default function Input({ placeholder, ...props }) {
    return (
        <div className="mt-[5px]">
            <input
                placeholder={placeholder}
                className="w-[350px] h-[50px] px-3 border border-gray-300rounded-md text-gray-800 placeholder-gray-400 focus:outline-none
                    focus:border-[#5769a9] focus:ring-2 focus:ring-[#5769a9]/30 transition duration-200"{...props}/>
        </div>
    )
}
