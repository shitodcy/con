// path: app/page.tsx
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { BookOpen, Users, Search, Star, Clock, TrendingUp } from "lucide-react"
import { createClient } from "@/lib/supabase/server"

export default async function HomePage() {
  const supabase = await createClient();

  const { data: books } = await supabase
    .from("books")
    .select(`
      id,
      title,
      rating,
      available_copies,
      book_authors ( authors ( first_name, last_name ) )
    `)
    .order("rating", { ascending: false })
    .limit(3);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center">
              <BookOpen className="h-8 w-8 text-blue-600" />
              <h1 className="ml-2 text-2xl font-bold text-gray-900">Perpustakaan Digital</h1>
            </div>
            <nav className="flex space-x-4">
              <Link href="/catalog">
                <Button variant="ghost">Katalog Buku</Button>
              </Link>
              <Link href="/about">
                <Button variant="ghost">Tentang</Button>
              </Link>
              <Link href="/login">
                <Button variant="outline">Login</Button>
              </Link>
              <Link href="/admin">
                <Button>Admin Panel</Button>
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <h2 className="text-4xl font-extrabold text-gray-900 sm:text-5xl">Selamat Datang di Perpustakaan Digital</h2>
          <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
            Sistem manajemen perpustakaan modern dengan fitur lengkap untuk mengelola koleksi buku, anggota, dan
            peminjaman secara digital dan efisien.
          </p>
          <div className="mt-8 flex justify-center space-x-4">
            <Link href="/catalog">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                <Search className="mr-2 h-5 w-5" />
                Jelajahi Katalog
              </Button>
            </Link>
            <Link href="/register">
              <Button size="lg" variant="outline">
                <Users className="mr-2 h-5 w-5" />
                Daftar Sekarang
              </Button>
            </Link>
          </div>
        </div>

        {/* Quick Stats & Features Sections (Tidak ada perubahan di sini) ... */}
        {/* ... */}

        {/* Popular Books Section */}
        <div className="mt-16">
          <div className="flex justify-between items-center mb-8">
            <h3 className="text-2xl font-bold text-gray-900">Buku Populer</h3>
            <Link href="/catalog">
              <Button variant="outline">Lihat Semua</Button>
            </Link>
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {books?.map((book) => {
              // FIX: Logika yang lebih aman untuk mengambil nama penulis
              const authorNames = book.book_authors
                .map(ba => {
                  const author = Array.isArray(ba.authors) ? ba.authors[0] : ba.authors;
                  if (!author) return null;
                  return `${author.first_name || ''} ${author.last_name || ''}`.trim();
                })
                .filter(Boolean)
                .join(', ') || "Penulis tidak diketahui";

              return (
                <Card key={book.id} className="bg-white/80 backdrop-blur-sm hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="w-full h-48 bg-gradient-to-br from-blue-100 to-blue-200 rounded-lg flex items-center justify-center mb-4">
                      <BookOpen className="h-16 w-16 text-blue-600" />
                    </div>
                    <CardTitle className="text-lg">{book.title}</CardTitle>
                    <CardDescription>{authorNames}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400 mr-1" />
                        <span className="text-sm font-medium">{book.rating || 'N/A'}</span>
                      </div>
                      <span className={`text-sm font-medium ${book.available_copies > 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {book.available_copies > 0 ? 'Tersedia' : 'Dipinjam'}
                      </span>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* CTA Section & Footer (Tidak ada perubahan di sini) ... */}
        {/* ... */}
      </main>
    </div>
  )
}