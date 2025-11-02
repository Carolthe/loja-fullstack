export default function Newsletter() {
    return (
        <div className="flex flex-col items-center text-center py-[40px]  w-[100vw] bg-gray-200  ">
            <h4 className="font-semibold text-fontGray ">SUBSCRIBE TO OUR NEWSLETTER</h4>
            <p className="w-[280px] text-fontGray pb-[15px] ">Don't lose your inspiration and stay up to date with all the latest news!</p>
            <form className="grid gap-3 ">
                <input className="pl-[8px] w-[300px] p-[7px] " placeholder="Name" />
                <input className="pl-[8px] w-[300px] p-[7px] " placeholder="E-mail" />
                <button className="p-[10px] bg-greenMain text-white ">SUBSCREVER</button>
            </form>
        </div>
    )
}