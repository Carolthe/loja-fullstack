export default function Input({ placeholder, ...props }) {
    return (
        <div className="mt-[5px]">
            <input
                placeholder={placeholder}
                className="w-[330px] h-[50px] rounded-[6px] px-3 border border-gray-300rounded-md text-gray-800 placeholder-gray-400 focus:outline-none
                    focus:border-[#5769a9] focus:ring-2 focus:ring-[#5769a9]/30 transition duration-200 md:w-[500px]"{...props}/>
        </div>
    )
}
