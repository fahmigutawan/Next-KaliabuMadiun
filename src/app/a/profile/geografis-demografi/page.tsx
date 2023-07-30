'use client'
import { ImagePicker } from "@/component/base/image-picker"
import { AppContext } from "@/context/provider"
import { Typography, TextField, Button } from "@mui/material"
import { useState, useContext, useEffect } from "react"
import toast from "react-hot-toast"
import Loading from "@/component/base/Loading"
import { GeoDemoResponse } from "@/model/response/geo-demo/geo-demo-response"

const AdminGeoDemo = () => {
    const [geoPhoto, setGeoPhoto] = useState<File | null>(null)
    const [demoPhoto, setDemoPhoto] = useState<File | null>(null)
    const [geoPhotoUrl, setGeoPhotoUrl] = useState("")
    const [demoPhotoUrl, setDemoPhotoUrl] = useState("")

    const [geoDemoData, setGeoDemoData] = useState<GeoDemoResponse | null>(null)
    const [isLoading, setIsLoading] = useState(false);
    const [geoContent, setGeoContent] = useState(geoDemoData?.geo_content)
    const [demoContent, setDemoContent] = useState(geoDemoData?.demo_content)
    const repository = useContext(AppContext).repository

    useEffect(() => {
        setIsLoading(true)
        repository.getGeoDemoDesa(
            (data) => {
                setGeoDemoData(data)
                setIsLoading(false)
            },
            (error) => {
                toast.error(error.message);
                setIsLoading(false)
            }
        );
    }, [])

    useEffect(() => {
        if (geoDemoData) {
            setGeoPhotoUrl(geoDemoData.geo_url)
            setDemoPhotoUrl(geoDemoData.demo_url)
            setGeoContent(geoDemoData.geo_content);
            setDemoContent(geoDemoData.demo_content);
        }
    }, [geoDemoData]);

    if (isLoading) {
        return <Loading />
    }

    const handleGeoFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];

        // Cek apakah file yang di-drop adalah file gambar
        if (file && file.type.startsWith('image/')) {
            const reader = new FileReader();
            setGeoPhoto(file)
            reader.onload = (event) => {
                setGeoPhotoUrl(event.target?.result as string);
            };

            reader.readAsDataURL(file);
        }
    };

    const handleDemoFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];

        // Cek apakah file yang di-drop adalah file gambar
        if (file && file.type.startsWith('image/')) {
            const reader = new FileReader();
            setDemoPhoto(file)
            reader.onload = (event) => {
                setDemoPhotoUrl(event.target?.result as string);
            };

            reader.readAsDataURL(file);
        }
    };

    return (
        <form className='w-full h-full bg-white p-[16px] overflow-auto flex flex-col justify-between space-y-[32px]'>
            <Typography className='text-black'>Edit Tentang</Typography>
            <div className='flex flex-col space-y-[16px]'>
                <label className="required" htmlFor="">Gambar geografis</label>
                <div>
                    {geoPhotoUrl &&
                        <img className='bg-gray-400 max-h-[256px] aspect-[4/3] object-cover' src={geoPhotoUrl} alt="" />
                    }
                    <input type="file" onChange={handleGeoFileChange} />
                </div>
                <label className="required" htmlFor="">Deskripsi geografis</label>
                <textarea placeholder="Masukkan deskripsi geografis" className="border-2 border-secondary800 p-2" rows={10} value={geoContent} onChange={(e) => setGeoContent(e.target.value)}>
                </textarea>

                <label className="required" htmlFor="">Gambar demografi</label>
                <div>
                    {demoPhotoUrl &&
                        <img className='bg-gray-400 max-h-[256px] aspect-[4/3] object-cover' src={demoPhotoUrl} alt="" />
                    }
                    <input type="file" onChange={handleDemoFileChange} />
                </div>
                <label className="required" htmlFor="">Deskripsi demografi</label>
                <textarea placeholder="Masukkan deskripsi demografi" className="border-2 border-secondary800 p-2" rows={10} value={demoContent} onChange={(e) => setDemoContent(e.target.value)}>
                </textarea>

            </div>
            <Button onClick={() => {
                toast.loading("Sedang mengupdate")
                if (geoPhoto && geoContent && demoPhoto && demoContent) {
                    repository.adminEditGeoDemoDesa(
                        geoPhoto,
                        geoContent,
                        demoPhoto,
                        demoContent,
                        () => {
                            toast.dismiss()
                            toast.success("Berhasil di-update")
                        },
                        (error) => {
                            toast.dismiss()
                            toast.error(error.message)
                        }
                    )
                }
            }}>UPDATE</Button>
        </form>
    )
}

export default AdminGeoDemo