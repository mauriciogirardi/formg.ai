import {
  RegisterLink,
  LoginLink,
} from '@kinde-oss/kinde-auth-nextjs/components'

export default function LandingPage() {
  return (
    <div>
      <p>Landing Page</p>
      <LoginLink>Sign in</LoginLink>
      <RegisterLink>Sign up</RegisterLink>
    </div>
  )
}
