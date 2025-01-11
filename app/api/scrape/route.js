import { NextResponse } from 'next/server';
import { ApifyClient } from 'apify-client';
import { prisma } from '@/lib/db';


const client = new ApifyClient({
    token: process.env.APIFY_TOKEN
});


export async function POST(req) {
    try {
        // Parse request body
        const body = await req.json();
        const { username, resultsLimit } = body;

        // Validate input
        if (!username || !Array.isArray(username) || !resultsLimit) {
            return NextResponse.json(
                { error: 'Invalid input. Please provide "username" (array) and "resultsLimit" (number).' },
                { status: 400 }
            );
        }

        // Prepare Actor input
        const input = {
            username,
            resultsLimit,
        };

        const run = await client.actor("nH2AHrwxeTRJoN5hX").call(input);

        
        const { items } = await client.dataset(run.defaultDatasetId).listItems();

        
        return NextResponse.json(
            { success: true, data: items },
            { status: 200 }
        );
    } catch (error) {
        console.error('Error in scraping:', error);
        return NextResponse.json(
            { success: false, error: error.message },
            { status: 500 }
        );
    }
}
