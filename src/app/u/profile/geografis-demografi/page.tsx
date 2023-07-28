'use client'
import Breadcrumb from "@/component/base/Breadcrumb"
import { GeoDemoResponse } from "@/model/response/geo-demo/geo-demo-response"
import { useContext, useState, useEffect } from "react"
import { AppContext } from "@/context/provider"
import { toast } from "react-hot-toast"
import Loading from "@/component/base/Loading"

const GeoDemoPage = () => {
    const repository = useContext(AppContext).repository;
    const [datas, setDatas] = useState<GeoDemoResponse | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setIsLoading(true)
        repository.getGeoDemoDesa(
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
        <div className="px-[45px] xl:px-[5.5rem] py-[2rem]">
            <Breadcrumb page={["Profil", "Geografis dan Demografi Desa"]} />
            <h2 className="text-secondary900 text-lg lg:text-4xl font-semibold lg:font-bold mb-[32px] lg:mb-[53px]">Geografis Desa</h2>
            <div className="bg-gray-400 w-full aspect-video md:h-[36rem] text-center mb-3 md:mb-[4rem]">
                <img src={datas?.geo_url} alt="" className="w-full" />
            </div>
            <p className="whitespace-pre-line text-xs md:text-base mb-10">{`${datas?.geo_content}`}
            </p>
            <h2 className="text-secondary900 text-lg lg:text-4xl font-semibold lg:font-bold mb-[32px] lg:mb-[53px]">Demografi Desa</h2>
            <div className="bg-gray-400 w-full aspect-video md:h-[36rem] text-center mb-3 md:mb-[4rem]">
                <img src={datas?.demo_url} alt="" className="w-full" />
            </div>
            <p className="whitespace-pre-line text-xs md:text-base">{`${datas?.demo_content}`}</p>
        </div>
    )
}

export default GeoDemoPage