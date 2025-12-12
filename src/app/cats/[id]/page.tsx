'use client';

import React, { useEffect, useState, use } from 'react';
import {
    Card,
    Button,
    Image,
    Chip,
} from '@heroui/react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import getCatYearNote from '@/utils/getCatAgeNote';
import { TyCat } from '@/types';

interface CatPageProps {
    params: { id: string };
}

const CatPage = ({ params }: CatPageProps) => {
    const { id } = use(params);
    const [cat, setCat] = useState<TyCat | null>(null);
    const [loading, setLoading] = useState(true);

    const [likes, setLikes] = useState(0);
    const [dislikes, setDislikes] = useState(0);

    useEffect(() => {
        const fetchCat = async () => {
            const res = await fetch(`/api/cats/${id}`);

            if (!res.ok) {
                notFound();
                return;
            }

            const data = await res.json();
            setCat(data);
            setLoading(false);
        };

        fetchCat();
    }, [id]);

    if (loading) {
        return (
            <div className="text-center text-xl py-20">
                Загружаем пушистика... 🐾
            </div>
        );
    }

    if (!cat) {
        notFound();
    }

    console.log('cat', cat);

    return (
        <div className="min-h-screen bg-gradient-to-br from-pink-50 to-blue-50 dark:from-default-100 dark:to-default-200 py-4 px-1">
            <div className="max-w-6xl mx-auto">

                <Link href="/cats">
                    <Button color="primary" variant="shadow" className="mb-4 ml-4">
                        ← Назад к всем пушистикам
                    </Button>
                </Link>

                <Card className="flex flex-col sm:flex-row gap-4 items-center p-4 mb-8 shadow-xl rounded-2xl bg-white/70 dark:bg-default-50 backdrop-blur-md border border-default-200 dark:border-default-100">
                    <Image
                        src={cat.logo_path}
                        className="shadow-lg rounded-xl object-cover w-[100%]"
                        height={400}
                        alt={cat.name}
                    />
                    <div className="flex flex-col p-0 sm:p-8 ml-0 sm:ml-8 gap-2">

                        <h1 className="text-3xl font-bold text-primary text-center">{cat.name}</h1>
                        <div className="flex flex-row flex-wrap gap-4 items-start justify-start">
                            <Chip color="primary">
                                <strong>Возраст:</strong>

                                {' '}
                                {cat.age}
                                {' '}
                                {getCatYearNote(cat.age)}
                            </Chip>
                            <Chip color="success">
                                <strong>Вес:</strong>
                                {' '}
                                {cat.weight}
                                {' '}
                                кг
                            </Chip>
                            <Chip color="secondary">
                                <strong>Порода:</strong>
                                {' '}
                                {cat.breed}
                            </Chip>
                        </div>
                        <p className="text-foreground/70 text-center">{cat.description}</p>
                        <p><strong>Любимые привычки:</strong></p>
                        <ul className="list-disc list-inside space-y-1 mb-4">
                            {cat.habits.map((habit, i) => (
                                <li key={i} className="text-foreground/80">{`${habit};`}</li>
                            ))}
                        </ul>
                        <div className="flex flex-row mt-auto items-center justify-center gap-4">
                            <Button
                                color="success"
                                variant="shadow"
                                onClick={() => setLikes(likes + 1)}
                            >
                                👍
                                {' '}
                                {likes}
                            </Button>
                            <Button
                                color="danger"
                                variant="shadow"
                                onClick={() => setDislikes(dislikes + 1)}
                            >
                                👎
                                {' '}
                                {dislikes}
                            </Button>
                        </div>
                    </div>

                </Card>

                <div className="bg-white/70 dark:bg-default-50 backdrop-blur-md rounded-2xl py-6 px-1 shadow-xl border border-default-200 dark:border-default-100">
                    <h2 className="text-2xl font-bold text-center mb-6 text-primary">
                        Галерея
                        {' '}
                        {cat.name}
                        {' '}
                        🐾
                    </h2>
                    <div className="columns-2 sm:columns-2 md:columns-3 lg:columns-4 gap-1">
                        {cat.gallery.map((image) => (
                            <div key={image} className="break-inside-avoid mb-1">
                                <Image
                                    alt={`${cat.name} фото ${image}`}
                                    src={image}
                                    width={300}
                                    className="w-full rounded-xl"
                                    isZoomed
                                />
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </div>
    );
};

export default CatPage;
