
import { useUser } from "@clerk/clerk-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export function Profile() {
  const { user } = useUser()

  if (!user) return null

  return (
    <Card>
      <CardHeader>
        <CardTitle>Profile</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center space-x-4">
          <Avatar className="h-20 w-20">
            <AvatarImage src={user.imageUrl} alt={user.fullName || ""} />
            <AvatarFallback>{user.firstName?.charAt(0)}</AvatarFallback>
          </Avatar>
          <div>
            <h2 className="text-2xl font-bold">{user.fullName}</h2>
            <p className="text-muted-foreground">{user.emailAddresses[0]?.emailAddress}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
