import {useEffect} from "react";
import Cookies from "js-cookie";
import {useRouter} from "next/navigation";
import {CircularProgress} from "@nextui-org/react";

export default function Home() {

  const nav = useRouter();

  useEffect(() => {
      const lang = Cookies.get('lang');
      nav.replace(`/${lang || 'en-us'}/je/swap-bridge`);
  }, []);
  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-center`}
    >
        <CircularProgress aria-label="Loading..." />
    </main>
  );
}
