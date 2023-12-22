import { LogOutNavBar } from "./log-out-navbar";
import { ModeToggle } from "./mode-toggle";

export const Navbar= () => {
  return (
    <div className="border-b ">
      <div className="flex h-16 items-center px-4 container">
        <h1 className="text-2xl font-bold">Todo App</h1>
        {/* <NavbarBackOfficeMenu className="mx-6 " /> */}
        <div className="ml-auto flex items-center space-x-4">
          <ModeToggle />
          <LogOutNavBar />
          <div className="flex lg:hidden">
            {/* <MenuMobileBackOffice /> */}
          </div>

        </div>
      </div>

    </div>
  )
}