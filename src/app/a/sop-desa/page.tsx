// 'use client'
// import { ImagePicker } from "@/component/base/image-picker"
// import { AppContext } from "@/context/provider"
// import { Typography, TextField, Button } from "@mui/material"
// import { useState, useContext, useEffect } from "react"
// import toast from "react-hot-toast"
// import Loading from "@/component/base/Loading"
// import { GeoDemoResponse } from "@/model/response/geo-demo/geo-demo-response"

// const AdminSopDesa = () => {
//     const [document, setDocument] = useState<File | null>(null)
//     const [demoPhoto, setDemoPhoto] = useState<File | null>(null)
//     const [geoDemoData, setGeoDemoData] = useState<GeoDemoResponse | null>(null)
//     const [isLoading, setIsLoading] = useState(false);
//     const [geoContent, setGeoContent] = useState(geoDemoData?.geo_content)
//     const [demoContent, setDemoContent] = useState(geoDemoData?.demo_content)
//     const repository = useContext(AppContext).repository

//     useEffect(() => {
//         setIsLoading(true)
//         repository.getGeoDemoDesa(
//             (data) => {
//                 setGeoDemoData(data)
//                 setIsLoading(false)
//             },
//             (error) => {
//                 toast.error(error.message);
//                 setIsLoading(false)
//             }
//         );
//     }, [])

//     if (isLoading) {
//         return <Loading />
//     }

//     return (
//         <form className='w-full h-full bg-white p-[16px] overflow-auto flex flex-col justify-between space-y-[32px]'>
//             <Typography className='text-black text-center text-2xl font-bold'>Edit Tentang</Typography>
//             <div className='flex flex-col space-y-[16px]'>
//                 <label htmlFor="document" className="required">Pilih Document</label>
//                 <ImagePicker
//                     onFilePicked={(s) => {
//                         setDocument(s)
//                     }}
//                     defaultUrl={""}
//                 />
//                 <label htmlFor="document" className="required">Pilih Document</label>
//                 <textarea className="border-2 border-secondary800 p-2" rows={10} value={geoContent} onChange={(e) => setGeoContent(e.target.value)}>
//                 </textarea>

//                 <ImagePicker
//                     onFilePicked={(s) => {
//                         setDemoPhoto(s)
//                     }}
//                     defaultUrl={""}
//                 />
//                 <textarea className="border-2 border-secondary800 p-2" rows={10} value={demoContent} onChange={(e) => setDemoContent(e.target.value)}>
//                 </textarea>

//             </div>
//             <Button onClick={() => {
//                 toast.loading("Sedang mengupdate")
//                 if (geoDemoData) {
//                     repository.adminEditGeoDemoDesa(
//                         document,
//                         geoContent,
//                         demoPhoto,
//                         demoContent,
//                         () => {
//                             toast.dismiss()
//                             toast.success("Berhasil di-update")
//                         },
//                         (error) => {
//                             toast.error(error.message)
//                         }
//                     )
//                 }
//             }}>UPDATE</Button>
//         </form>
//     )
// }

// export default AdminSopDesa