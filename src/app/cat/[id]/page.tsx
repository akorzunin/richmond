/* eslint-disable max-len */

'use client';

import React, { useEffect, useState } from 'react';
import {
    Card, CardHeader, CardBody, CardFooter, Button, Image,
} from '@heroui/react';
import Link from 'next/link';
import { notFound } from 'next/navigation';

interface Cat {
    id: number;
    name: string;
    age: number;
    weight: number;
    habits: string[];
    description: string;
    image: string;
    gallery: number[];
}

interface CatPageProps {
    params: { id: string };
}

const CatPage = ({ params }: CatPageProps) => {
    const [cat, setCat] = useState<Cat | null>(null);
    const [loading, setLoading] = useState(true);

    const [likes, setLikes] = useState(0);
    const [dislikes, setDislikes] = useState(0);

    useEffect(() => {
        const fetchCat = async () => {
            const res = await fetch(`/api/cats/${params.id}`);

            if (!res.ok) {
                notFound();
                return;
            }

            const data = await res.json();
            setCat(data);
            setLoading(false);
        };

        fetchCat();
    }, [params.id]);

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

    return (
        <div className="min-h-screen bg-gradient-to-br from-pink-50 to-blue-50 dark:from-default-100 dark:to-default-200 py-8 px-4">
            <div className="max-w-6xl mx-auto">

                <Link href="/gallery">
                    <Button color="primary" variant="shadow" className="mb-6">
                        ← Назад к всем пушистикам
                    </Button>
                </Link>

                <Card className="max-w-2xl mx-auto mb-8 shadow-xl rounded-2xl bg-white/70 dark:bg-default-50 backdrop-blur-md border border-default-200 dark:border-default-100">
                    <CardHeader className="flex flex-col items-center gap-4 p-6">
                        <Image
                            src={cat.logo}
                            className="shadow-lg rounded-xl object-cover"
                            height={400}
                            width={400}
                            alt={cat.name}
                        />
                        <h1 className="text-3xl font-bold text-primary">{cat.name}</h1>
                        <p className="text-foreground/70 text-center">{cat.description}</p>
                    </CardHeader>

                    <CardBody className="flex flex-col gap-3 mt-2 px-6">
                        <p>
                            <strong>Возраст:</strong>
                            {' '}
                            {cat.age}
                        </p>
                        <p>
                            <strong>Вес:</strong>
                            {' '}
                            {cat.weight}
                            {' '}
                            кг
                        </p>
                        <p><strong>Любимые привычки:</strong></p>
                        <ul className="list-disc list-inside space-y-1">
                            {cat.habits.map((habit, i) => (
                                <li key={i} className="text-foreground/80">{habit}</li>
                            ))}
                        </ul>
                    </CardBody>

                    <CardFooter className="flex justify-center gap-4 mt-4 p-6">
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
                    </CardFooter>
                </Card>

                <div className="bg-white/70 dark:bg-default-50 backdrop-blur-md rounded-2xl p-6 shadow-xl border border-default-200 dark:border-default-100">
                    <h2 className="text-2xl font-bold text-center mb-6 text-primary">
                        Галерея
                        {' '}
                        {cat.name}
                        {' '}
                        🐾
                    </h2>
                    <div className="columns-1 sm:columns-2 md:columns-3 gap-4 space-y-4">
                        {cat.gallery.map((image) => (
                            <div key={image} className="break-inside-avoid mb-4">
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
