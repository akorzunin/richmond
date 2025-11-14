/* eslint-disable no-restricted-syntax */
/* eslint-disable no-await-in-loop */
// import { promises as fs } from 'fs';
// import path from 'path';
// import sharp from 'sharp';

// interface Cat {
//     id: number;
//     name: string;
//     age: number;
//     weight: number;
//     habits: string[];
//     description: string;
//     logo: string;
//     gallery: string[];
// }

// interface CatsData {
//     cats: Cat[];
// }

// const dataFilePath = path.join(process.cwd(), 'src', 'state', 'cats.json');
// const uploadsDir = path.join(process.cwd(), 'public', 'uploads');

// const ensureDirectories = async (): Promise<void> => {
//     await fs.mkdir(path.dirname(dataFilePath), { recursive: true });
//     await fs.mkdir(uploadsDir, { recursive: true });
// };

// export async function POST(request: Request): Promise<Response> {
//     try {
//         await ensureDirectories();

//         const formData = await request.formData();
//         const name = formData.get('name') as string;
//         const age = formData.get('age') as string;
//         const weight = formData.get('weight') as string;
//         const habits = formData.get('habits') as string;
//         const description = formData.get('description') as string;
//         const titlePhoto = formData.get('titlePhoto') as File;
//         const galleryPhotos = formData.getAll('galleryPhotos') as File[];

//         if (!name || !name.trim()) {
//             return Response.json({ success: false, error: 'Имя обязательно' });
//         }

//         if (!titlePhoto) {
//             return Response.json({ success: false, error: 'Главное фото обязательно' });
//         }

//         let jsonData: CatsData;
//         try {
//             const data = await fs.readFile(dataFilePath, 'utf8');
//             jsonData = JSON.parse(data);
//         } catch {
//             jsonData = { cats: [] };
//         }

//         const newId = jsonData.cats.length > 0
//             ? Math.max(...jsonData.cats.map((cat) => cat.id)) + 1
//             : 1;

//         let logoPath = '';
//         if (titlePhoto) {
//             const buffer = await titlePhoto.arrayBuffer();
//             const filename = `logo-${newId}-${Math.random().toString(36).substring(2, 9)}.jpg`;
//             const filepath = path.join(uploadsDir, filename);

//             await sharp(Buffer.from(buffer))
//                 .resize(1200, 1200, {
//                     fit: 'inside',
//                     withoutEnlargement: true,
//                 })
//                 .jpeg({ quality: 80 })
//                 .toFile(filepath);

//             logoPath = `/uploads/${filename}`;
//         }

//         const galleryPaths: string[] = [];
//         for (const photo of galleryPhotos) {
//             try {
//                 const buffer = await photo.arrayBuffer();
//                 const filename = `${newId}-${galleryPhotos.indexOf(photo)}.jpg`;
//                 const filepath = path.join(uploadsDir, filename);

//                 await sharp(Buffer.from(buffer))
//                     .resize(1200, 1200, {
//                         fit: 'inside',
//                         withoutEnlargement: true,
//                     })
//                     .jpeg({ quality: 80 })
//                     .toFile(filepath);

//                 galleryPaths.push(`/uploads/${filename}`);
//             } catch (error) {
//                 console.error('Error processing gallery image:', error);
//             }
//         }

//         const newCat: Cat = {
//             id: newId,
//             name: name.trim(),
//             age: parseInt(age) || 0,
//             weight: parseFloat(weight) || 0,
//             habits: habits ? habits.split(',').map((h) => h.trim()).filter((h) => h) : [],
//             description: (description || '').trim(),
//             logo: logoPath,
//             gallery: galleryPaths,
//         };

//         jsonData.cats.push(newCat);
//         await fs.writeFile(dataFilePath, JSON.stringify(jsonData, null, 2));

//         return Response.json({ success: true, cat: newCat });
//     } catch (error) {
//         console.error('Error saving cat:', error);
//         return Response.json({ success: false, error: 'Ошибка сервера' });
//     }
// }

const cats = [
    {
        id: 1,
        name: 'Ричик',
        age: 3,
        weight: 5.5,
        habits: [
            'Кусать за ноги',
            'Ловить лучики солнца',
            'Мурчать по утрам',
            'Выпрашивать вкусняшки',
        ],
        description: 'Самый харизматичный котик на свете!',
        logo: '/12.jpg',
        gallery: [
            '/1.jpg',
            '/2.jpg',
            '/3.jpg',
            '/4.jpg',
            '/5.jpg',
            '/6.jpg',
            '/7.jpg',
            '/8.jpg',
            '/9.jpg',
            '/10.jpg',
            '/11.jpg',
            '/12.jpg',
            '/13.jpg',
            '/14.jpg',
            '/15.jpg',
            '/16.jpg',
            '/17.jpg',
            '/18.jpg',
            '/19.jpg',
            '/20.jpg',
            '/21.jpg',
            '/22.jpg',
            '/23.jpg',
            '/24.jpg',
            '/25.jpg',
            '/26.jpg',
            '/27.jpg',
            '/28.jpg',
            '/29.jpg',
            '/30.jpg',
            '/31.jpg',
            '/32.jpg',
            '/33.jpg',
            '/34.jpg',
            '/35.jpg',
            '/36.jpg',
            '/37.jpg',
            '/38.jpg',
            '/39.jpg',
            '/40.jpg',
        ],
    },
    {
        id: 2,
        name: 'Бубка',
        age: 10,
        weight: 4.5,
        habits: [
            'Спать к верху пузиком',
            'Шипеть на всех подряд',
            'Находиться в типише и спокойствии',
        ],
        description: 'Милая толстенькая пухляшка!',
        logo: '/bubka-2.jpg',
        gallery: [
            '/bubka-1.jpg',
            '/bubka-2.jpg',
            '/bubka-3.jpg',
            '/bubka-4.jpg',
            '/bubka-5.jpg',
            '/bubka-6.jpg',
            '/bubka-7.jpg',
            '/bubka-8.jpg',
            '/bubka-9.jpg',
            '/bubka-10.jpg',
            '/bubka-11.jpg',
            '/bubka-12.jpg',
            '/bubka-13.jpg',
            '/bubka-14.jpg',
            '/bubka-15.jpg',
            '/bubka-16.jpg',
            '/bubka-17.jpg',
            '/bubka-18.jpg',
            '/bubka-19.jpg',
            '/bubka-20.jpg',
        ],
    },
    {
        id: 3,
        name: 'Лёвчик',
        age: 13,
        weight: 5.1,
        habits: [
            'Ловить мышей',
            'Есть паштетик',
            'Валяться в корзиночке',
        ],
        description: 'Серьёзный деревенский котик, который не будет с вами шутить!',
        logo: '/lev-1.jpg',
        gallery: [
            '/lev-1.jpg',
            '/lev-2.jpg',
            '/lev-3.jpg',
            '/lev-4.jpg',
            '/lev-5.jpg',
            '/lev-6.jpg',
            '/lev-7.jpg',
            '/lev-8.jpg',
            '/lev-9.jpg',
            '/lev-10.jpg',
            '/lev-11.jpg',
            '/lev-12.jpg',
            '/lev-13.jpg',
            '/lev-14.jpg',
            '/lev-15.jpg',
            '/lev-16.jpg',
            '/lev-17.jpg',
            '/lev-18.jpg',
            '/lev-19.jpg',
            '/lev-20.jpg',
            '/lev-21.jpg',
            '/lev-22.jpg',
            '/lev-23.jpg',
        ],
    },
    {
        id: 4,
        name: 'новый пушистик',
        age: 6,
        weight: 2,
        habits: [
            'Супер классный!',
        ],
        description: 'Котик',
        logo: '/uploads/logo-4-lxe56ac.jpg',
        gallery: [
            '/uploads/4-0.jpg',
            '/uploads/4-1.jpg',
        ],
    },
];

export async function GET(): Promise<Response> {
    return Response.json({ cats });
}

// export async function GET(): Promise<Response> {
//     try {
//         await ensureDirectories();
//         const data = await fs.readFile(dataFilePath, 'utf8');
//         const jsonData = JSON.parse(data);
//         return Response.json(jsonData);
//     } catch (error) {
//         console.error('Error reading cats data:', error);
//         return Response.json({ cats: [] });
//     }
// }
