import { HomeBanner } from "@/component/home/banner";
import { BeritaTerkini } from "@/component/home/berita-terkini";
import { GaleriKaliabu } from "@/component/home/galeri-kaliabu";
import { HomeSekilas } from "@/component/home/sekilas";

export default function HomePage() {
    return (
        <div>
            <HomeBanner />
            <div className='flex flex-col space-y-[32px] py-[32px] px-[48px]'>
                <HomeSekilas />
                <BeritaTerkini />
                <GaleriKaliabu />
            </div>
        </div>
    )
}