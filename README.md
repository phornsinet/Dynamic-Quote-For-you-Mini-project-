# Dynamic-Quote-For-you-Mini-project
## Author 
Phorn Sinet
## Descriptions
This is a **Dynamic Quote For you (mini-project)** website that displays dynamic quotes for users. The project is built with Next.js (React framework) and uses Supabase as the backend database. Quotes are stored in Supabase and fetched through its API, then displayed dynamically on the frontend.
## Features
1. Random Quote Generation: Displays a new inspirational quote with a button click.
2. Database Integration: Quotes are fetched from a Supabase database, allowing for easy updates and expansion of the quote library.
3. Secure API Route: Utilizes a Next.js API route to securely fetch data from the database, keeping sensitive credentials server-side.
4. Responsive Design: The user interface is designed to be accessible and visually appealing on both desktop and mobile devices.
5. Ambient Background Music: A light, ambient music track plays in the background, adding to the user experience.
### Technologies Used
- **Frontend**: Next.js (React), Tailwind CSS  
- **Backend**: Supabase API  
- **Database**: Supabase (PostgreSQL)
## Project Setup
1. Install Dependencies: Open terminal and install the require packages(npm install).
2. Configure Environment Variables: Create a files name(.env.local) and I add your Supabase API URL and anonymous key to this file.
NEXT_PUBLIC_SUPABASE_URL=YOUR_SUPABASE_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY=YOUR_SUPABASE_ANON_KEY
3. Supabase Database Setup
CREATE TABLE IF NOT EXISTS quotes (
  id SERIAL PRIMARY KEY,
  quote_text TEXT NOT NULL,
  author VARCHAR(255) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
CREATE INDEX IF NOT EXISTS idx_quotes_author ON quotes(author);
ALTER TABLE quotes ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can read quotes" ON quotes
  FOR SELECT USING (true);
5. Run the Development Server(npm run dev) and then open http://localhost:3000 in browser to see the app.
## Project Architecture
1.Frontend (Next.js):Handles the user interface and displays dynamic quotes. It communicates with the backend through Supabase’s API.
2.Backend (Supabase):Acts as the database layer where all the quotes are stored. Supabase provides an API to read/write data securely.
3.Communication Flow: 
3.1 User opens the website in the browser. 
3.2 Next.js (frontend) sends a request to Supabase via the provided API keys. 
3.3 Supabase returns the stored quotes. -Next.js renders and displays the quote dynamically on the page.
