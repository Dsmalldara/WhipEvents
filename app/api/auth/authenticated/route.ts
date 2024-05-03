import { connectToDatabase } from "@/lib/database";
import User from "@/lib/database/models/userModel";
import { handleError } from "@/lib/utils";
import {getKindeServerSession} from "@kinde-oss/kinde-auth-nextjs/server";
import { NextResponse } from "next/server"
 export async function GET(){
    const {getUser} = getKindeServerSession()
        const user = await getUser()
        if(!user || user === null || !user.id) throw new Error ("user not logged in")
        try{
                await connectToDatabase()
                const existingUser = await User.findOne({email: user.email})
                if(existingUser) return NextResponse.redirect('http://localhost:3000')
                    
              else if (!existingUser){
                let userProfile = await User.create({
                    family_name: user.family_name || '',
                    given_name: user.given_name || '',
                    picture: user.picture ?? 'https://avatar.vercel.sh/rauchg',
                    email: user.email || '',
                    id:user.id
                })
                return NextResponse.redirect('http://localhost:3000')
              }

        }
        catch(error){
            handleError(error)
        }
}
