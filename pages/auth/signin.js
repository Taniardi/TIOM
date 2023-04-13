import { getProviders, signIn, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import Head from "next/head";
import { useEffect } from "react";
import Loader from "../../comps/Loader";

function Signin({ providers }) {
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (session) {
      router.push("/");
    }
  }, [session]);

  if (session) return <Loader />;

  return (
    <div className="bg-black h-screen flex flex-col items-center pt-80 space-y-8">
      <Head>
        <title>Login</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {Object.values(providers).map((provider) => (
        <div key={provider.name}>
          <button
            className="text-white py-4 px-6 rounded-full bg-neutral-900 transition duration-300 ease-out border border-transparent uppercase font-bold text-xs md:text-base tracking-wider hover:scale-105 hover:bg-[#0db146]"
            onClick={() => signIn(provider.id)}
          >
            Login with {provider.name}
          </button>
        </div>
      ))}
    </div>
  );
}

export default Signin;

export async function getServerSideProps() {
  const providers = await getProviders();
  return {
    props: { providers },
  };
}