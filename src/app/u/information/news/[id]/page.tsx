'use client'

import Breadcrumb from "@/component/base/Breadcrumb"
import { useParams } from "next/navigation"
import { useContext, useState, useEffect } from "react"
import { AppContext } from "@/context/provider"
import { NewsResponse } from "@/model/response/news/news-response"
import { toast } from "react-hot-toast"
import Loading from "@/component/base/Loading"

const NewsDetailPage = () => {
  const params = useParams();
  const id = params.id;
  const repository = useContext(AppContext).repository;
  const [newsData, setNewsData] = useState<NewsResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true)
    repository.getNewsById(
      id,
      (data) => {
          setNewsData(data)
          setIsLoading(false)
      },
      (error) => {
          toast.error(error.message);
          setIsLoading(false)
      }
  );
  },[])

  if(isLoading){
    return <Loading />
  }

  
  return (
    <div className="px-[5.5rem] py-[2rem]">
      <Breadcrumb page={["Informasi", "Berita", "Nama Berita"]}/>
      <h2 className="text-secondary900 text-4xl font-bold mb-[53px]">{newsData?.title}</h2>
      <div className="w-full flex items-center justify-center mb-[4rem]">
        <div className="bg-gray-400 w-[37.5rem] text-center">
          <img src={newsData?.thumbnail} alt="" className="w-full"/>
        </div>
      </div>
      <p className="whitespace-pre-line">{`${newsData?.content}`}</p>
    </div>
  )
}

export default NewsDetailPage