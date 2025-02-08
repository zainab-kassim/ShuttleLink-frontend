import { useRouter } from "next/navigation"
import { useEffect } from "react"



export default function Home() {
  const router = useRouter()
  const role=localStorage.getItem('role')

  useEffect(() => {
    if (role === 'driver') {
      router.push('/role/driver')
    } else {
      router.push('/role/passenger')
    }
  }, [])

  return (
    <div>home page</div>
  )
}
