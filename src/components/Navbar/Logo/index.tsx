import Image from 'next/image';
import {useRouter} from 'next/navigation'


const Logo = () => {
    
    return(
        <Image
            alt='Logo'
            className='hidden md:block cursor-pointer sm:block lg:block'
            height='130'
            width='130'
            src='/icons/logo.svg'
        />
    )
}

export default Logo;