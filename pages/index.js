import Head from 'next/head'
import Dashb from '../comps/Dashb'
import {useRouter} from 'next/router'
import {useSession} from 'next-auth/react'
import Loader from '../comps/Loader'


export default function Home() {
    const router = useRouter()
    const {status, data: session} = useSession({
        required: true,
        onUnauthenticated(){
            router.push('/auth/signin')
        }
    })

    if(status === 'loading') {
        return <Loader/>
    }
     
    return (
        <div className=''>
            <Head>
                <title>T.I.O.M</title>
            </Head>

            <Dashb/>
        </div>
    )
}