export async function GET() {
  const obj = {
    message: "hello world",
  };
  return new Response(JSON.stringify(obj));
}
