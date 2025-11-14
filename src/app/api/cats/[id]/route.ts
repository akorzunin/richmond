import { NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';
import { TyCat } from '@/types';

interface CatsData {
    cats: TyCat[];
}

const dataFilePath = path.join(process.cwd(), 'src', 'state', 'cats.json');

export async function GET(_: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await params;
        const catId = parseInt(id);

        const data = await fs.readFile(dataFilePath, 'utf8');
        const jsonData: CatsData = JSON.parse(data);
        
        const cat = jsonData.cats.find((c) => c.id === catId);

        if (!cat) {
            return NextResponse.json({ error: 'Cat not found' }, { status: 404 });
        }

        return NextResponse.json(cat);
    } catch (error) {
        console.error('Error fetching cat:', error);
        return NextResponse.json({ error: 'Server error' }, { status: 500 });
    }
}