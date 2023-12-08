async function getData() {
  // Next.js extends the native fetch Web API to allow you to configure the caching and revalidating behavior for each fetch request on the server
  const res = await fetch("https://api.example.com/...");
  // The return value is *not* serialized
  // You can return Date, Map, Set, etc.

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

export default async function ServerExample() {
  const data = await getData();

  return (
    <main>
      <div>client example</div>
    </main>
  );
}
