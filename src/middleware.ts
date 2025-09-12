import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server'

const publicRouts = [
    "/login",
    "/email-verify",
    "/forgot-password",
    "/reset-password"
]


export default async function middleware(request: NextRequest) {

    const current_req = request.nextUrl.pathname;
    const accessToken = request.cookies.get('accessToken')?.value;

    if (!accessToken && !publicRouts.includes(current_req)) {
        return NextResponse.redirect(new URL(`/login`, request.url));
    }

    return NextResponse.next()

}

export const config = {
    matcher: ["/((?!api|_next|.*\\..*).*)"],
};