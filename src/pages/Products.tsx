import React from 'react'
import type Book from '../interface/Book'
import { getBooks } from '../api/booksApi'
import Navbar from '../components/Navbar'
import { useEffect, useState } from 'react'
import Card from '../components/Card'
export default function Products() {
    const [books, setBooks] = useState<Book[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchBooks = async () => {
            try {
                const response = await getBooks();
                console.log(response)
                setBooks(response.data.books);
            } catch (err) {
                setError("Failed to fetch books. Please try again later.");
                console.error(err);
            } finally {
                setIsLoading(false);
            }
        };

        fetchBooks();
    }, []);

    if (isLoading) {
        return <div className="text-center text-text pt-20">Loading books...</div>;
    }

    if (error) {
        return <div className="text-center text-red-500 pt-20">{error}</div>;
    }

    return (
        <div className="h-screen w-screen bg-background overflow-y-scroll">
            <Navbar />
            <div className="max-w-6xl w-full px-6">
                <div className=" grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-5 2xl:grid-cols-6 md:gap-x-60 gap-x-10  mt-4 mb-8">
                    {books.map((book) => (
                        <Card key={book._id} book={book} />
                    ))}
                </div>
            </div>
        </div>
    )
}
