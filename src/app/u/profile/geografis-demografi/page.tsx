'use client'
import Breadcrumb from "@/component/base/Breadcrumb"

const GeoDemoPage = () => {
    return (
        <div className="px-[5.5rem] py-[2rem]">
            <Breadcrumb page={["Profil", "Geografis dan Demografi Desa"]} />
            <h2 className="text-secondary900 text-4xl font-bold mb-[53px]">Geografis Desa</h2>
            <div className="bg-gray-400 w-full h-[36rem] text-center mb-[4rem]"></div>
            <p className="whitespace-pre-line">{`
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur faucibus ipsum orci, eget volutpat nulla porta at. Ut sit amet erat nec massa ornare sagittis. Mauris pulvinar velit quis vulputate ornare. Vivamus et dolor nec nisi convallis dapibus quis ut nunc. Fusce eget nulla fermentum, pellentesque nisi nec, maximus lorem. Duis eget dui maximus, congue diam ut, vulputate urna. Donec mollis risus nec metus fringilla, non pellentesque urna feugiat. Sed rutrum tincidunt sem, semper tempor ante luctus quis. Mauris feugiat venenatis velit, et blandit lorem maximus facilisis.

      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur faucibus ipsum orci, eget volutpat nulla porta at. Ut sit amet erat nec massa ornare sagittis. Mauris pulvinar velit quis vulputate ornare. Vivamus et dolor nec nisi convallis dapibus quis ut nunc. Fusce eget nulla fermentum, pellentesque nisi nec, maximus lorem. Duis eget dui maximus, congue diam ut, vulputate urna. Donec mollis risus nec metus fringilla, non pellentesque urna feugiat. Sed rutrum tincidunt sem, semper tempor ante luctus quis. Mauris feugiat venenatis velit, et blandit lorem maximus facilisis.`}
            </p>
            <h2 className="text-secondary900 text-4xl font-bold  my-[53px]">Demografi Desa</h2>
                <div className="bg-gray-400 w-full h-[36rem] text-center mb-[4rem]"></div>
            <p className="whitespace-pre-line">{`
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur faucibus ipsum orci, eget volutpat nulla porta at. Ut sit amet erat nec massa ornare sagittis. Mauris pulvinar velit quis vulputate ornare. Vivamus et dolor nec nisi convallis dapibus quis ut nunc. Fusce eget nulla fermentum, pellentesque nisi nec, maximus lorem. Duis eget dui maximus, congue diam ut, vulputate urna. Donec mollis risus nec metus fringilla, non pellentesque urna feugiat. Sed rutrum tincidunt sem, semper tempor ante luctus quis. Mauris feugiat venenatis velit, et blandit lorem maximus facilisis.

      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur faucibus ipsum orci, eget volutpat nulla porta at. Ut sit amet erat nec massa ornare sagittis. Mauris pulvinar velit quis vulputate ornare. Vivamus et dolor nec nisi convallis dapibus quis ut nunc. Fusce eget nulla fermentum, pellentesque nisi nec, maximus lorem. Duis eget dui maximus, congue diam ut, vulputate urna. Donec mollis risus nec metus fringilla, non pellentesque urna feugiat. Sed rutrum tincidunt sem, semper tempor ante luctus quis. Mauris feugiat venenatis velit, et blandit lorem maximus facilisis.`}</p>
        </div>
    )
}

export default GeoDemoPage