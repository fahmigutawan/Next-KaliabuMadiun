import { Button, IconButton } from "@mui/material"
import { AiFillEdit } from 'react-icons/ai'

type AdminCommandPanelProps = {
    editClicked: () => void,
    deleteClicked: () => void
}

export const AdminCommandPanel: React.FC<AdminCommandPanelProps> = ({
    editClicked,
    deleteClicked
}) => {
    return (
        <div className='flex flex-col space-y-[8px] justify-center items-center'>
            <Button
                className='bg-green-500 hover:bg-green-600 text-white'
                onClick={editClicked}
            >EDIT</Button>
            <Button
                className='bg-error500 hover:bg-error600 text-white'
                onClick={deleteClicked}
            >HAPUS</Button>
        </div>
    )
}