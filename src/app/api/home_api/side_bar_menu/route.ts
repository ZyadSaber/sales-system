import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const app_pages = await prisma.page_parent.findMany({
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
      select: {
        page_parent_name: true,
        page_parent_id: true,
        page_parent_index: true,
        app_pages: {
          where: {
            page_disabled: false,
          },
          select: {
            page_name: true,
            page_id: true,
            page_link: true,
          },
        },
      },
    });

    return new Response(JSON.stringify(app_pages));
  } catch (error) {
    console.log(error);
    return new Response(JSON.stringify({ error: error }));
  }
}
