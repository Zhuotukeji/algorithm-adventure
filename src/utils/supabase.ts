// Supabase client utility
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://unjspenxavczhdhfhqln.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVuanNwZW54YXZjemhkaGZocWxuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzA5OTc0ODYsImV4cCI6MjA4NjU3MzQ4Nn0.Eg6Xb2bXPCjnVmW5NPTpsS9J2VpnjdZskWlMDFUoj5xo';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
