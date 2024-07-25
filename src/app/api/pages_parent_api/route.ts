import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const [data, count] = await Promise.all([
      prisma.page_parent.findMany({
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
      }),
      prisma.page_parent.count({
        where: {
          hidden: false,
          app_pages: {
            some: {
              page_disabled: false,
            },
          },
        },
      }),
    ]);

    return new Response(
      JSON.stringify({
        count,
        data,
      })
    );
  } catch (error) {
    console.log(error);
    return new Response(JSON.stringify({ error: error }));
  }
}
