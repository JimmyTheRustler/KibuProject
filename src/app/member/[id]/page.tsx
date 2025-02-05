import { promises as fs } from 'fs';
import path from 'path';
import BackButton from '@/app/components/BackButton';
import AddNoteForm from '@/app/components/AddNoteForm';
import { Suspense } from 'react';

//recycled getData func from main page, should move this to its own file
async function getData() {
  const filePath = path.join(process.cwd(), '/src/app/db.json');
  const data = await fs.readFile(filePath, 'utf-8');
  return JSON.parse(data);
}

//create a members note page by utilizing dynamic route paging
export default async function MemberPage({ 
  params 
}: { 
  params: { id: string } 
}) {
  const data = await getData();
  //Filter all of json data to return only specific member info
  const memberNotes = data.notes.filter(
    (note) => note.member === params.id
  );
  const member = data.members.find(
    (m) => m.id.toString() === params.id
  );

  return (
    <div className="p-4 max-w-2xl mx-auto relative">
      <BackButton />
      <div className="text-center">
        <h1 className="text-2xl font-bold mb-4">Member Details</h1>
        <p className="mb-4">Member: {member?.firstName} {member?.lastName}</p>
        
        <h2 className="text-xl font-semibold mb-2">Notes:</h2>
      </div>
      
      {/* suspense added to give user feedback that site is loading data */}
      <Suspense fallback={<div>Loading form...</div>}>
        <AddNoteForm memberId={params.id} />
      </Suspense>

      <div className="space-y-2">
        {memberNotes.map((note) => (
          <div 
            key={note.id} 
            className="mb-2 p-2 bg-sky-500/50 rounded text-white text-center relative group"
            title={note.createdAt ? new Date(note.createdAt).toLocaleString() : 'No timestamp available'}
          >
            <p>{note.text}</p>
            <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 bg-black text-white px-2 py-1 rounded text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-200 mb-1 whitespace-nowrap">
              {note.createdAt ? new Date(note.createdAt).toLocaleString() : 'No timestamp available'}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
} 