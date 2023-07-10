import { useState } from "react";

type ImagePickerProps = {
    onFilePicked:(file:File) => void
}

export const ImagePicker:React.FC<ImagePickerProps> = ({
    onFilePicked
}) => {
    const [pickedFile, setPickedFile] = useState<File | null>(null)
    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];

        // Cek apakah file yang di-drop adalah file gambar
        if (file && file.type.startsWith('image/')) {
            onFilePicked(file)
            setPickedFile(file)
        }
    };

    return (
        <div className='w-full p-[32px] rounded border border-gray-400 flex flex-col justify-center items-center space-y-[16px]'>
            {
                pickedFile && <img className='max-h-[256px]' src={URL.createObjectURL(pickedFile)} alt="" />
            }
            <input className='text-black' type='file' onChange={handleFileChange} />
        </div>
    )
}