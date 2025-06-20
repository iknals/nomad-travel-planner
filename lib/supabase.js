import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://dlknzchcqdxofichrwjl.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRsa256Y2hjcWR4b2ZpY2hyd2psIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTAzOTk2MTIsImV4cCI6MjA2NTk3NTYxMn0.ftdhlIjgO8Q_frcTUCmtZIIRmniUmfOZSAwNsMLOdkQ';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
