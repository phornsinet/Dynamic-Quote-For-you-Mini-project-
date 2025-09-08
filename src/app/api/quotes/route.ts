import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY! 
);

export async function GET() {
  try {
    const { data: quotes, error } = await supabase.from("quotes").select("*");

    if (error) {
      console.error("Supabase error:", error.message); 
      return NextResponse.json(
        { success: false, error: "Failed to fetch quotes from database" },
        { status: 500 }
      );
    }

    if (Array.isArray(quotes) && quotes.length > 0) {
      const randomIndex = Math.floor(Math.random() * quotes.length);
      const randomQuote = quotes[randomIndex];

      return NextResponse.json({
        success: true,
        quote: {
          text: randomQuote.quote_text, 
          author: randomQuote.author, 
        },
      });
    } else {
      return NextResponse.json(
        { success: false, error: "No quotes found in database" },
        { status: 404 }
      );
    }
  } catch (error) {
    console.error("API error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch quote" },
      { status: 500 }
    );
  }
}
