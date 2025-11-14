/* eslint-disable no-restricted-syntax */
/* eslint-disable no-await-in-loop */
import { promises as fs } from 'fs';
import path from 'path';
import sharp from 'sharp';

interface Cat {
    id: number;
    name: string;
    age: number;
    weight: number;
    habits: string[];
    description: string;
    logo: string;
    gallery: string[];
}

interface CatsData {
    cats: Cat[];
}

const dataFilePath = path.join(process.cwd(), 'src', 'state', 'cats.json');
const uploadsDir = path.join(process.cwd(), 'public', 'uploads');

const ensureDirectories = async (): Promise<void> => {
    await fs.mkdir(path.dirname(dataFilePath), { recursive: true });
    await fs.mkdir(uploadsDir, { recursive: true });
};

export async function POST(request: Request): Promise<Response> {
    try {
        await ensureDirectories();

        const formData = await request.formData();
        const name = formData.get('name') as string;
        const age = formData.get('age') as string;
        const weight = formData.get('weight') as string;
        const habits = formData.get('habits') as string;
        const description = formData.get('description') as string;
        const titlePhoto = formData.get('titlePhoto') as File;
        const galleryPhotos = formData.getAll('galleryPhotos') as File[];

        if (!name || !name.trim()) {
            return Response.json({ success: false, error: 'Имя обязательно' });
        }

        if (!titlePhoto) {
            return Response.json({ success: false, error: 'Главное фото обязательно' });
        }

        let jsonData: CatsData;
        try {
            const data = await fs.readFile(dataFilePath, 'utf8');
            jsonData = JSON.parse(data);
        } catch {
            jsonData = { cats: [] };
        }

        const newId = jsonData.cats.length > 0
            ? Math.max(...jsonData.cats.map((cat) => cat.id)) + 1
            : 1;

        let logoPath = '';
        if (titlePhoto) {
            const buffer = await titlePhoto.arrayBuffer();
            const filename = `logo-${newId}-${Math.random().toString(36).substring(2, 9)}.jpg`;
            const filepath = path.join(uploadsDir, filename);

            await sharp(Buffer.from(buffer))
                .resize(1200, 1200, {
                    fit: 'inside',
                    withoutEnlargement: true,
                })
                .jpeg({ quality: 80 })
                .toFile(filepath);

            logoPath = `/uploads/${filename}`;
        }

        const galleryPaths: string[] = [];
        for (const photo of galleryPhotos) {
            try {
                const buffer = await photo.arrayBuffer();
                const filename = `${newId}-${galleryPhotos.indexOf(photo)}.jpg`;
                const filepath = path.join(uploadsDir, filename);

                await sharp(Buffer.from(buffer))
                    .resize(1200, 1200, {
                        fit: 'inside',
                        withoutEnlargement: true,
                    })
                    .jpeg({ quality: 80 })
                    .toFile(filepath);

                galleryPaths.push(`/uploads/${filename}`);
            } catch (error) {
                console.error('Error processing gallery image:', error);
            }
        }

        const newCat: Cat = {
            id: newId,
            name: name.trim(),
            age: parseInt(age) || 0,
            weight: parseFloat(weight) || 0,
            habits: habits ? habits.split(',').map((h) => h.trim()).filter((h) => h) : [],
            description: (description || '').trim(),
            logo: logoPath,
            gallery: galleryPaths,
        };

        jsonData.cats.push(newCat);
        await fs.writeFile(dataFilePath, JSON.stringify(jsonData, null, 2));

        return Response.json({ success: true, cat: newCat });
    } catch (error) {
        console.error('Error saving cat:', error);
        return Response.json({ success: false, error: 'Ошибка сервера' });
    }
}

export async function GET(): Promise<Response> {
    try {
        await ensureDirectories();
        const data = await fs.readFile(dataFilePath, 'utf8');
        const jsonData = JSON.parse(data);
        return Response.json(jsonData);
    } catch (error) {
        console.error('Error reading cats data:', error);
        return Response.json({ cats: [] });
    }
}
