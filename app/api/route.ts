export async function GET(request: Request) {
  console.log("GET request");
  return Response.json({ message: "Hello World" });
}
