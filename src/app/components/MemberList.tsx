'use client';
import { useRouter } from 'next/navigation';

//interface to ensure we get all required data during button creation
interface Member {
  id: number;
  firstName: string;
  lastName: string;
}

export default function MemberList({ members }: { members: Member[] }) {
  //init a router to send data back to main page
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center">
      <h1 className="text-2xl font-bold mb-4">Members</h1>
      <div className="flex flex-wrap justify-center gap-2">
        {/* take member data and map it to button creation */}
        {members.map((item) => (
          <div key={item.id}>
            <button 
              onClick={() => router.push(`/member/${item.id}`)}
              className="px-4 py-2 m-2 bg-sky-500/50 text-white rounded-md hover:bg-blue-600 transition-colors duration-200 shadow-sm hover:shadow-md"
            >
              {item.firstName} {item.lastName}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
} 