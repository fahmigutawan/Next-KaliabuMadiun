'use client'
import Breadcrumb from "@/component/base/Breadcrumb"
import { useContext, useState, useEffect } from "react"
import { AppContext } from "@/context/provider"
import { toast } from "react-hot-toast"
import Loading from "@/component/base/Loading"
import { TentangResponse } from "@/model/response/tentang/tentang-response"

const AboutPage = () => {
    const repository = useContext(AppContext).repository;
    const [datas, setDatas] = useState<TentangResponse | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setIsLoading(true)
        repository.getTentangDesa(
            (data) => {
                setDatas(data)
                setIsLoading(false)
            },
            (error) => {
                toast.error(error.message);
                setIsLoading(false)
            }
        );
    }, [])

    if (isLoading) {
        return <Loading />
    }
  return (
    <div className="px-[5.5rem] py-[2rem]">
      <Breadcrumb page={["Profil", "Tentang"]}/>
      <h2 className="text-secondary900 text-4xl font-bold mb-[53px]">Tentang Desa Kaliabu</h2>
      <div className="w-full flex items-center justify-center mb-[4rem]">
        <div className="bg-gray-400 w-[37.5rem] h-[17.7rem] text-center"></div>
      </div>
      <p className="whitespace-pre-line">{`${datas?.content}`}</p>
    </div>
  )
}

export default AboutPage