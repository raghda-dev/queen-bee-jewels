// client/app/api/test-shopify/route.ts

export async function GET() {
  try {
    const endpoint = `https://${process.env.SHOPIFY_STORE_DOMAIN}/api/2023-10/graphql.json`;

    const res = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Shopify-Storefront-Access-Token": process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN!,
      },
      body: JSON.stringify({
        query: `{
          shop {
            name
          }
        }`,
      }),
    });

    if (!res.ok) {
      const text = await res.text();
      console.error("Non-200 response:", text);
      return new Response("Shopify fetch failed", { status: 500 });
    }

    const data = await res.json();
    console.log("Shopify data:", data);
    return new Response(JSON.stringify(data), { status: 200 });
  } catch (err) {
    console.error("Fetch error:", err);
    return new Response("Something went wrong", { status: 500 });
  }
}
