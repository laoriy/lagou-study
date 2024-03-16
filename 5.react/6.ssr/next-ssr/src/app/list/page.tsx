import type { Metadata } from 'next'

export default function List() {
    return (
        <div>
            <h1 className="flex  text-red-500 size-20 text-4xl">List</h1>
        </div>
    );
}

 
export const metadata: Metadata = {
    title: 'list page',
    description: '...',
  }