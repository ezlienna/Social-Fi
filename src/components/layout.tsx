import React, { useState, ReactNode, useEffect, useContext } from 'react'
import LandingHeader from './landingheader'
import Footer from './landingfooter'
import Header from './header'
import { Saira } from 'next/font/google';
import { usePathname } from 'next/navigation';

import api from '@/constants/auth';
import setAuthToken from '@/constants/setAuthToken';
import { useRouter } from 'next/navigation';
import { signOut, useSession } from 'next-auth/react'
import { UserContext } from '@/contexts/UserProvider';
import Loading from '@/pages/loading';
import toast, {Toaster} from 'react-hot-toast';
import axios from 'axios';
import Head from 'next/head';

const saira = Saira({
  weight: '400',
  subsets: ['latin']
})

interface MyComponentProps {
  children: ReactNode;
}


const Layout = ({ children }: MyComponentProps) => {
  const path = usePathname();
  const [main, setMain] = useState(false);

  // @ts-ignore
  const { myProfile, setMyProfile } = useContext(UserContext)
  const router = useRouter()

  // Get profile info
  const { status, data:session } = useSession();

  useEffect(() => {
    if (status == 'loading') return
    if (session) {      
      if (status == 'authenticated') {
        //@ts-ignore
        const twitterid = session.token.sub;
        const userinfo = localStorage.getItem('token');
        if (userinfo) {
          setAuthToken(userinfo);
          api.get('/users').then((res) => {
            if (res.data.user) {
              setMyProfile(res.data.userdata);
              router.push(path == "/"?'/home':path);
            } else {
              setAuthToken(false);
              router.push('/');
            }
          }).catch(
            err => {
              setAuthToken(false);
              router.push('/');
            }
          )
        } else {
          api.post('/users', {signin: twitterid}).then(
            res => {
              const { token, user } = res.data;
              setAuthToken(token);
              setMyProfile(user);
              router.push('/home');
            }
          ).catch(err => {
            router.push('/');
          })
        }
      } else {
        if (status !='loading') {
            router.push('/');
        }
      }
    } else {
      router.push('/');
    }
  }, [path, status])

  useEffect(() => {
    if (path == '/') {
      setMain(true)
    } else {
      setMain(false)
    }
  }, [path])

  if (status == 'loading') {
    return (
      <>
        <Head>
        <title>The Sahara - Your Digital Oasis</title>
        <meta name="description" content="It's easier to connect with the world of Web3 with The Sahara" />

        <meta property="og:url" content="https://beta.sahara.social" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="The Sahara - Your Digital Oasis" />
        <meta property="og:description" content="It's easier to connect with the world of Web3 with The Sahara" />

        <meta property="og:image" content="https://ogcdn.net/e4b8c678-7bd5-445d-ba03-bfaad510c686/v3/beta.sahara.social/The%20Sahara%20-%20Your%20Digital%20Oasis/https%3A%2F%2Fopengraph.b-cdn.net%2Fproduction%2Fdocuments%2Fb390c4c6-8e14-44a8-98c1-d0044f395955.png%3Ftoken%3D_TIUOPWQbhS6yEPfuj9XhjVOp4BbM5ZBTzs-a388oGQ%26height%3D720%26width%3D1200%26expires%3D33241297867/og.png" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta property="twitter:domain" content="beta.sahara.social" />
        <meta property="twitter:url" content="https://beta.sahara.social" />
        <meta name="twitter:title" content="The Sahara - Your Digital Oasis" />
        <meta name="twitter:description" content="It's easier to connect with the world of Web3 with The Sahara" />

        <meta name="twitter:image" content="https://ogcdn.net/e4b8c678-7bd5-445d-ba03-bfaad510c686/v3/beta.sahara.social/The%20Sahara%20-%20Your%20Digital%20Oasis/https%3A%2F%2Fopengraph.b-cdn.net%2Fproduction%2Fdocuments%2Fb390c4c6-8e14-44a8-98c1-d0044f395955.png%3Ftoken%3D_TIUOPWQbhS6yEPfuj9XhjVOp4BbM5ZBTzs-a388oGQ%26height%3D720%26width%3D1200%26expires%3D33241297867/og.png" />
      </Head>
      <Loading />
      </>
    )
  } else {
    if (!main) {
      if (myProfile.avatar) {
        return (
          <>
          <Head>
            <title>The Sahara - Your Digital Oasis</title>
            <meta name="description" content="It's easier to connect with the world of Web3 with The Sahara" />

            <meta property="og:url" content="https://beta.sahara.social" />
            <meta property="og:type" content="website" />
            <meta property="og:title" content="The Sahara - Your Digital Oasis" />
            <meta property="og:description" content="It's easier to connect with the world of Web3 with The Sahara" />

            <meta property="og:image" content="https://ogcdn.net/e4b8c678-7bd5-445d-ba03-bfaad510c686/v3/beta.sahara.social/The%20Sahara%20-%20Your%20Digital%20Oasis/https%3A%2F%2Fopengraph.b-cdn.net%2Fproduction%2Fdocuments%2Fb390c4c6-8e14-44a8-98c1-d0044f395955.png%3Ftoken%3D_TIUOPWQbhS6yEPfuj9XhjVOp4BbM5ZBTzs-a388oGQ%26height%3D720%26width%3D1200%26expires%3D33241297867/og.png" />

            <meta name="twitter:card" content="summary_large_image" />
            <meta property="twitter:domain" content="beta.sahara.social" />
            <meta property="twitter:url" content="https://beta.sahara.social" />
            <meta name="twitter:title" content="The Sahara - Your Digital Oasis" />
            <meta name="twitter:description" content="It's easier to connect with the world of Web3 with The Sahara" />

            <meta name="twitter:image" content="https://ogcdn.net/e4b8c678-7bd5-445d-ba03-bfaad510c686/v3/beta.sahara.social/The%20Sahara%20-%20Your%20Digital%20Oasis/https%3A%2F%2Fopengraph.b-cdn.net%2Fproduction%2Fdocuments%2Fb390c4c6-8e14-44a8-98c1-d0044f395955.png%3Ftoken%3D_TIUOPWQbhS6yEPfuj9XhjVOp4BbM5ZBTzs-a388oGQ%26height%3D720%26width%3D1200%26expires%3D33241297867/og.png" />
          </Head>
          <div className={saira.className}>
            <Header />
            {children}
            <Toaster 
              position="top-right"
              reverseOrder={false}
             />
          </div>
          </>
        )
      }
    } else {
        return (
          <>
          <main className="flex min-h-screen flex-col items-center justify-between">
            <LandingHeader />
            {children}
            <Footer />
          </main>
          </>
        )
    }
  }

}

export default Layout