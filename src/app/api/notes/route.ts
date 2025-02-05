import { promises as fs } from 'fs';
import path from 'path';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { memberId, text } = await request.json();
    
    //recycled getData func from main page
    const filePath = path.join(process.cwd(), '/src/app/db.json');
    const fileData = await fs.readFile(filePath, 'utf-8');
    const data = JSON.parse(fileData);
    
    //create new note with string values and timestamp, all are string types
    const newNote = {
      id: (data.notes.length + 1).toString(),
      member: memberId.toString(),
      text: text,
      createdAt: new Date().toISOString() 
    };
    
    //push the new note to the member note page
    data.notes.push(newNote);
    
    //write note to json file
    await fs.writeFile(filePath, JSON.stringify(data, null, 2));
    
    return NextResponse.json({ success: true, note: newNote });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to add note' }, { status: 500 });
  }
} 