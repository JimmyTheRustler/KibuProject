import MemberList from './components/MemberList';
import { promises as fs } from 'fs';
import path from 'path';

//Gets data from json to use for member names on buttons
async function getData() {
  const filePath = path.join(process.cwd(), '/src/app/db.json');
  const data = await fs.readFile(filePath, 'utf-8');
  return JSON.parse(data);
}

//Main homepage, contains buttons to select each member
export default async function Home() {
  const data = await getData();
  
  return (
    <div>
        {/* calls memberlist comp to generate buttons for all members found */}
        <MemberList members={data.members} />
    </div>
  );
}
