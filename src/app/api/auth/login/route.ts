import prisma from "@/lib/prisma";

export async function POST(request: Request) {
        
    const body = await request.json();

    const { login, password } = body;

    if (!login || !password) {
        return Response.json({
            error: 'Gugu =)'
        }, { status: 418 })
    }

    const user = await prisma.account.findFirst({
        where: {
            OR: [
                {
                    email: login
                },
                {
                    username: login
                }
            ]
        }
    });

    if(!user) 
        return Response.json({
            error: 'gugugug gug gugugugugu' //Usuário não encontrado            
        }, { status: 400 })

    if(user.password !== password) 
        return Response.json({
                error: 'g gugug gugu gugugugug' //A senha está incorreta
            }, { status: 400 })
         
    
    const token = crypto.randomUUID() + crypto.randomUUID() + crypto.randomUUID();

    await prisma.accountSessions.create({
        data: {
            accountId: user.id,
            token: token 
        },
    });

    return Response.json({
        token
    }, { status: 200 })
}