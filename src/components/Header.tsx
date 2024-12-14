import { Button } from "./ui/button";
import { Link } from "react-router-dom";
import { useUser } from "@clerk/clerk-react";
import { SignedIn,SignedOut,SignInButton,UserButton } from "@clerk/clerk-react";

export default function Header() {
  const path = window.location.pathname;
  const {isSignedIn,isLoaded} = useUser();

   if(!isLoaded){
     return null
   }
  
  return (
    <div className="flex w-[99%] p-4 drop-shadow-sm rounded-xl justify-between px-8 items-center bg-white z-50">
      
      <div className="text-black font-semibold text-3xl">
        <Link to={'/'}>QRSys</Link>
      </div>
      
      {
        path === '/admin' ? (
          <>{ 
            !isSignedIn ? ( <SignedOut>
                   <SignInButton />
                 </SignedOut>) : (<SignedIn>
                         <UserButton />
                       </SignedIn>)
            
            }</>
        ) : (
            <Button className="bg-blue-800 text-white font-semibold text-xl"><Link to={ '/admin' }>Admin</Link></Button>
        )
      }
      
    </div>
  );
}
