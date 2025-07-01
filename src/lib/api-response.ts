import { NextResponse } from "next/server";

export function apiSuccess<T>(data: T) {
  return NextResponse.json({ code: 0, data });
}

export function apiError(error: string, code = 1) {
  return NextResponse.json({ code, error });
}