// src/supabaseClient.ts
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = "https://pgeuxgdlypzaygxhvbzf.supabase.co"
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBnZXV4Z2RseXB6YXlneGh2YnpmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTE1MjgzOTYsImV4cCI6MjA2NzEwNDM5Nn0.GHfxxC37qpZEPu5SkOkdPJmrYV0T-G0H1ECdWmsk2-Q"

// ✅ Create the Supabase client
const supabase = createClient(supabaseUrl, supabaseAnonKey)

export default supabase
