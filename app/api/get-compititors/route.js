import { prisma } from "@/lib/db";
import { NextResponse } from "next/server";


export async function GET(request) {
    const searchParams = request.nextUrl.searchParams
    const query = searchParams.get('username')
    try {

        const compititor = await prisma.compititor.findFirst({where:{username:query}})

        const data = compititor.post_data
        
        return NextResponse.json({
            result : data
        })
    } catch (error) {
        console.log(error);
        return NextResponse.json({
            error
        })
    }
} 