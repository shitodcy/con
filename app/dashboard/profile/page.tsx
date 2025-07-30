// path: app/dashboard/profile/page.tsx
import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { ProfileForm } from './ProfileForm' // Komponen form (dibuat di langkah 3)
import { Button } from '@/components/ui/button'

export default async function ProfilePage() {
  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) {
    redirect('/login')
  }

  // Ambil data profil dari tabel 'profiles'
  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single()
    
  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
      <div className="max-w-4xl mx-auto">
        <Button variant="outline" asChild className="mb-4">
          <Link href="/dashboard">Kembali ke Dashboard</Link>
        </Button>
        <ProfileForm profile={profile} />
      </div>
    </div>
  )
}