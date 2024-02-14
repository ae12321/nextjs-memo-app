import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import logoImage from "@/app/assets/logo.png";
import topImage from "@/app/assets/top.svg";

// breakpoint: 1024px, lg, w-5xl, 64rem

export default function Home() {
  return (
    <main>
      <section className="max-w-5xl mx-auto p-4 h-screen grid place-items-center lg:grid-cols-[1fr,300px]">
        <div>
          <div className="flex items-center gap-4">
            <Image src={logoImage} alt="logo" className="w-12 h-12" />
            <h1 className="text-4xl font-bold">Memo App</h1>
          </div>
          <p className="leading-loose max-w-lg mt-4">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Molestiae perferendis quo autem debitis a deserunt
            beatae hic itaque aspernatur, porro commodi illum veniam quasi vel, iure accusantium maiores id ut.
          </p>
          <div className="text-center">
            <Button className="mt-4" asChild>
              <Link href={"/add-memo"}>ログイン</Link>
            </Button>
          </div>
        </div>
        <Image src={topImage} alt="top" className="hidden lg:block" />
      </section>
    </main>
  );
}
