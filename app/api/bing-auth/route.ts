import { NextResponse } from "next/server"

export async function GET() {
  const xmlContent = `<?xml version="1.0"?>
<users>
<user>26CBCE4736E0D0D93A7A6B4B6EC9A507</user>
</users>`

  return new NextResponse(xmlContent, {
    status: 200,
    headers: {
      "Content-Type": "application/xml",
    },
  })
}
