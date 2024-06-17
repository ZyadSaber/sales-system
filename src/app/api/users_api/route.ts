export async function GET() {
  const obj = {
    message: "hello world",
  };
  console.log(obj);
  return new Response(JSON.stringify(obj));
}
