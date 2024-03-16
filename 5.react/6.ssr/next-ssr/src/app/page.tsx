import Image from "next/image";
import Link from "next/link";
import type { Metadata } from 'next'
import { readFile } from 'fs';
import { promisify } from 'util';
import { join } from 'path';
const read = promisify(readFile);

export default async function Home() {
  const {data} = await getProjects()
  return (
    <main className="flex  flex-col items-center text-center justify-center p-24">
      <h1>Hello, Next.js!</h1>
      <p>link</p>
      <ul>
        <li>
          <Link href="/">Home</Link>
        </li>
        <li>
          <Link href="/list">list page</Link>
        </li>
        <p>静态资源：</p>
        <Image src="/vercel.svg" width={200} height={200} alt="" />
      </ul>
      <div>{data}</div>
    </main>
  );
}

 
export const metadata: Metadata = {
  title: 'home page',
  description: '...',
}

export async function getProjects () {
  let data = await read(join(process.cwd(), 'src/app', 'layout.tsx'), 'utf-8');
  
  console.log('HELLO');
  return {
    data
  }
}