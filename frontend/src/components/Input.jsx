export default function Input({ placeholder, ...props }) {
    return (
        <div className="mt-[5px]">
            <input placeholder={placeholder} className="w-[300px] h-[50px] pl-[10px] border-[1px] rounded-[5px]" 
            {...props} />
        </div>
    )
}