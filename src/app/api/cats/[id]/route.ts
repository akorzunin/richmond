import { NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

interface Cat {
    id: number;
    name: string;
    age: number;
    weight: number;
    habits: string[];
    description: string;
    logo?: string;
    gallery: string[];
}

interface CatsData {
    cats: Cat[];
}

const dataFilePath = path.join(process.cwd(), 'src', 'state', 'cats.json');

export async function GET(_: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        // Await params
        const { id } = await params;
        const catId = parseInt(id);

        // Читаем данные из файла
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