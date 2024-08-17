import { type NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { normalizeTableSourceApi } from "@/helpers";
import { RecordWithAnyData } from "@/types";

export async function GET() {
  try {
    const data = await prisma.page_parent.findMany({
      where: {
        // app_pages: {
        //   some: {
        //     page_disabled: false,
        //   },
        // },
      },
      orderBy: {
        page_parent_index: "asc",
      },
    });
    return new Response(JSON.stringify(normalizeTableSourceApi(data)));
  } catch (error) {
    console.log(error);
    return new Response(JSON.stringify({ error: error }));
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    await body.forEach(
      async ({
        record_status,
        page_parent_name,
        hidden,
        page_parent_index,
        page_parent_id,
      }: RecordWithAnyData) => {
        switch (record_status) {
          case "n":
            await prisma.page_parent.create({
              data: {
                page_parent_name,
                hidden,
                page_parent_index: +page_parent_index,
              },
            });
            break;

          case "u":
            await prisma.page_parent.update({
              where: {
                page_parent_id,
              },
              data: {
                page_parent_name,
                hidden,
                page_parent_index: +page_parent_index,
              },
            });
            break;

          case "d":
            await prisma.page_parent.delete({
              where: {
                page_parent_id,
              },
            });
            break;

          default:
            break;
        }
      }
    );

    return new Response(JSON.stringify(request));
  } catch (error) {
    console.log(error);
    return new Response(JSON.stringify({ error: error }));
  }
}
