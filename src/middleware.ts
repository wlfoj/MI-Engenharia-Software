import { withAuth } from "next-auth/middleware"
import { NextResponse } from "next/server"

export default withAuth(
  // `withAuth` augments your `Request` with the user's token.
  function middleware(req) {
    console.log(req.nextauth.token)
    if (
        req.nextUrl.pathname.startsWith("/administrador") &&
        req.nextauth.token?.role !== "administrador"
    ) {
        return new NextResponse("Você não é autorizado!")
    }
    if (
        req.nextUrl.pathname.startsWith("/promoter") &&
        req.nextauth.token?.role !== "promoter" 
    ) {
        return new NextResponse("Você não é autorizado!")
    }
    if (
        req.nextUrl.pathname.startsWith("/cliente") &&
        req.nextauth.token?.role !== "cliente"
    ) {
        return new NextResponse("Você não é autorizado!")
    }
  },
  {
    callbacks: {
      authorized: ({token}) => !!token
    },
  }
)

export const config = { matcher: ["/administrador/:path*", "/cliente/:path*", "/promoter/:path*"] }