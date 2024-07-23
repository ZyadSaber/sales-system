import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const pages_parent = await prisma.page_parent.findMany({
      where: {
        hidden: false,
        app_pages: {
          some: {
            page_disabled: false,
          },
        },
      },
      orderBy: {
        page_parent_index: "asc",
      },
      include: {
        app_pages: true,
      },
    });

    return new Response(JSON.stringify(pages_parent));
  } catch (error) {
    console.log(error);
    return new Response(JSON.stringify({ error: error }));
  }
}
