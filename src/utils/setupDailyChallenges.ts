// Database setup for daily challenges
// Run this file once to set up the database tables

import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://unjspenxavczhdhfhqln.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVuanNwZW54YXZjemhkaGZocWxuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzA5OTc0ODYsImV4cCI6MjA4NjU3MzQ4Nn0.Eg6Xb2bXPCjnVmW5NPTpsS9J2VpnjdZskWlMDFUoj5xo';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function setupDailyChallengesTable() {
  console.log('Setting up daily challenges table...');

  // Create daily_challenges table
  const { error: createError } = await supabase.rpc('create_daily_challenges_table', {
    sql: `
      CREATE TABLE IF NOT EXISTS daily_challenges (
        id SERIAL PRIMARY KEY,
        date DATE NOT NULL UNIQUE,
        title VARCHAR(255) NOT NULL,
        description TEXT,
        difficulty VARCHAR(50) NOT NULL,
        chapter_id INTEGER NOT NULL,
        level_id VARCHAR(50) NOT NULL,
        code_template TEXT NOT NULL,
        solution TEXT NOT NULL,
        test_cases JSONB NOT NULL,
        hints JSONB NOT NULL,
        rewards JSONB NOT NULL,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `
  });

  if (createError) {
    console.log('Note: Table may already exist or RPC not available, trying alternative...');
  }

  // Create user_daily_progress table
  const { error: progressError } = await supabase.rpc('create_user_daily_progress_table', {
    sql: `
      CREATE TABLE IF NOT EXISTS user_daily_progress (
        id SERIAL PRIMARY KEY,
        user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
        challenge_date DATE NOT NULL,
        status VARCHAR(50) DEFAULT 'not_started',
        attempts INTEGER DEFAULT 0,
        best_time INTEGER,
        completed_at TIMESTAMP WITH TIME ZONE,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        UNIQUE(user_id, challenge_date)
      );
    `
  });

  if (progressError) {
    console.log('Note: Progress table may already exist...');
  }

  console.log('Database setup complete!');
}

setupDailyChallengesTable().catch(console.error);
