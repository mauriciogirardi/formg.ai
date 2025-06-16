import { getFormStatsByUserId } from '@/api/form-stars-api'
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server'
import { NextResponse } from 'next/server'

export async function GET() {
  const session = getKindeServerSession()
  const user = await session.getUser()

  if (!user) {
    return NextResponse.json(
      { success: false, message: 'Unauthorized' },
      { status: 401 }
    )
  }

  try {
    const stats = await getFormStatsByUserId(user.id)
    return NextResponse.json({ success: true, ...stats })
  } catch (error) {
    return NextResponse.json(
      { success: false, message: 'Internal error' },
      { status: 500 }
    )
  }
}
