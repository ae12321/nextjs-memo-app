import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <main>
      <h1 className="text-5xl text-blue-500">hello world</h1>
      <Button className="w-full" variant={"link"}>
        Click me
      </Button>
    </main>
  );
}
