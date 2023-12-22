import { LogOut } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback } from "../ui/avatar"
import { Separator } from "@/components/ui/separator";
import { useAuthStore } from "@/hooks/useAuthStore"

export function LogOutNavBar() {
  const { logout, user } = useAuthStore();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar>
          <AvatarFallback>{user?.username.substring(0, 2,).toUpperCase()}</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>User</DropdownMenuLabel>
        <DropdownMenuItem >
          {user?.username}
        </DropdownMenuItem>
        <Separator />
        <DropdownMenuLabel>Role</DropdownMenuLabel>
        <DropdownMenuItem >
          {user?.role}
        </DropdownMenuItem>

        <Separator />
        <DropdownMenuItem onClick={() => { logout() }}>
          <LogOut className="pr-3" /> Log Out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};