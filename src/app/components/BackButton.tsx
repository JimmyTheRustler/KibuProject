'use client';
import { useRouter } from 'next/navigation';

export default function BackButton() {
  //init a router to use for site navigation
  const router = useRouter();

  return (
    //Create back button using built in .back() function
    <button
      onClick={() => router.back()}
      className="absolute top-4 left-4 px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition-colors duration-200 shadow-sm hover:shadow-md"
    >
      ← Back
    </button>
  );
} 