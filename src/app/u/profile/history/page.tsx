'use client'
import Breadcrumb from "@/component/base/Breadcrumb"

const HistoryPage = () => {
    return (
        <div className="px-[5.5rem] py-[2rem]">
            <Breadcrumb page={["Profil", "Sejarah Desa"]} />
            <h2 className="text-secondary900 text-4xl font-bold mb-[53px]">Sejarah Desa</h2>
            <div className="w-full flex items-center justify-center mb-[4rem]">
                <div className="bg-gray-400 w-[37.5rem] h-[17.7rem] text-center"></div>
            </div>
            <p className="whitespace-pre-line">{`
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur faucibus ipsum orci, eget volutpat nulla porta at. Ut sit amet erat nec massa ornare sagittis. Mauris pulvinar velit quis vulputate ornare. Vivamus et dolor nec nisi convallis dapibus quis ut nunc. Fusce eget nulla fermentum, pellentesque nisi nec, maximus lorem. Duis eget dui maximus, congue diam ut, vulputate urna. Donec mollis risus nec metus fringilla, non pellentesque urna feugiat. Sed rutrum tincidunt sem, semper tempor ante luctus quis. Mauris feugiat venenatis velit, et blandit lorem maximus facilisis.

      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur faucibus ipsum orci, eget volutpat nulla porta at. Ut sit amet erat nec massa ornare sagittis. Mauris pulvinar velit quis vulputate ornare. Vivamus et dolor nec nisi convallis dapibus quis ut nunc. Fusce eget nulla fermentum, pellentesque nisi nec, maximus lorem. Duis eget dui maximus, congue diam ut, vulputate urna. Donec mollis risus nec metus fringilla, non pellentesque urna feugiat. Sed rutrum tincidunt sem, semper tempor ante luctus quis. Mauris feugiat venenatis velit, et blandit lorem maximus facilisis.`}</p>
        </div>
    )
}

export default HistoryPage