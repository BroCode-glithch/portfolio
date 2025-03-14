import { join } from 'path';
import { existsSync } from 'fs';
import { NextResponse } from 'next/server';

export async function GET(req) {
    const filePath = join(process.cwd(), 'public/assets/certs/English_for_IT_1_certificate.pdf');

    if (!existsSync(filePath)) {
        return NextResponse.json({ error: 'File not found' }, { status: 404 });
    }

    return new NextResponse(null, {
        status: 200,
        headers: {
            'Content-Type': 'application/pdf',
            'Content-Disposition': 'inline', // Ensures it opens in the browser
        },
        body: await Deno.open(filePath),
    });
}