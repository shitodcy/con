// path: app/dashboard/profile/ProfileForm.tsx
'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { updateProfileAction } from './actions' // Server Action (dibuat di langkah 4)

// Tentukan tipe data untuk profil
type Profile = {
  id: string;
  name: string | null;
  // tambahkan properti lain jika ada, contoh:
  // first_name: string | null;
  // last_name: string | null;
} | null;

export function ProfileForm({ profile }: { profile: Profile }) {
  const [name, setName] = useState(profile?.name || '')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [message, setMessage] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setMessage('')
    
    const result = await updateProfileAction({ name });
    
    if (result.success) {
      setMessage('Profil berhasil diperbarui!')
    } else {
      setMessage(`Error: ${result.error}`)
    }
    
    setIsSubmitting(false)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Profil Anda</CardTitle>
        <CardDescription>Perbarui informasi profil Anda di sini.</CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="name">Nama Lengkap</Label>
            <Input 
              id="name" 
              value={name} 
              onChange={(e) => setName(e.target.value)} 
            />
          </div>
          {/* Tambahkan field lain di sini jika diperlukan */}
        </CardContent>
        <CardFooter className="flex justify-between items-center">
          {message && <p className="text-sm text-gray-600">{message}</p>}
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Menyimpan...' : 'Simpan Perubahan'}
          </Button>
        </CardFooter>
      </form>
    </Card>
  )
}