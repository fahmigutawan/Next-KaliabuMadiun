import { useState } from "react";

type ImagePickerProps = {
    onFilePicked: (file: File) => void,
    defaultUrl?: string
}

export const ImagePicker: React.FC<ImagePickerProps> = ({
    onFilePicked,
    defaultUrl
}) => {
    const [pickedFile, setPickedFile] = useState<File | null>(null)
    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];

        if (file && file.type.startsWith('image/')) {
            onFilePicked(file)
            setPickedFile(file)
        }
    };

    return (
        <div className='w-full p-[32px] rounded border border-gray-400 flex flex-col justify-center items-center space-y-[16px]'>
            {
                (pickedFile != null) ?
                    <img
                        className='max-h-[256px]'
                        src={URL.createObjectURL(pickedFile)}
                        alt=""
                    /> :
                    <img
                        className='max-h-[256px]'
                        src={defaultUrl ?? ""}
                        alt=""
                    />
            }

            {!defaultUrl
                && <input className='text-black' type='file' onChange={handleFileChange} />
            }
        </div>
    )
}