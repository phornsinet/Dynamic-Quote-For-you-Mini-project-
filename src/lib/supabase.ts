import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://ymmuaaghbwxncwnyrhvx.supabase.co'
const supabaseKey = process.env.SUPABASE_KEY as string;

if (!supabaseKey) {
  throw new Error('SUPABASE_KEY is not defined in the environment variables');
}

const supabase = createClient(supabaseUrl, supabaseKey);

console.log("Supabase URL:", process.env.NEXT_PUBLIC_SUPABASE_URL);
console.log("Supabase Key:", process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

export async function GET() {
  try {
    const { data, error } = await supabase.from("quotes").select("*");

    if (error) {
      return new Response(JSON.stringify({ error: error.message }), {
        status: 500,
      });
    }

    return new Response(JSON.stringify(data), { status: 200 });
  } catch (err) {
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
    });
  }
}