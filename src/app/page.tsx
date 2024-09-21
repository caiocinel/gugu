import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";
import { cookies } from "next/headers"

export default async function handler() {
    const token = cookies().get('token');

    if(!token)
        return redirect('/login');   
    

    const account = await prisma.account.findFirst({
        where: {
            Sessions: {
                some: {
                    token: token.value
                }
            }
        }
    })


    if(!account){
        cookies().delete('token');
        return redirect('/login');
    }


    return (
        <div>
        {account.username}
       </div>
    )
}