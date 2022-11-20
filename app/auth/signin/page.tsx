import { getProviders, signIn } from 'next-auth/react';
import Image from 'next/image';
import SigninComponent from './SigninComponent';
async function Signin() {
    const providers = await getProviders();

    return (
        <div className='grid justify-center'>

            <div >
                <Image
                    className="rounded-full mx-2 object-cover"
                    width={700}
                    height={700}
                    src="https://links.papareact.com/161"
                    alt='profile'
                />
            </div>
            <SigninComponent providers={providers} />
        </div>
    )
}

export default Signin