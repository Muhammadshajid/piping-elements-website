import { createClient } from '@supabase/supabase-js';
import { projectId, publicAnonKey } from './info';

// Create Supabase client for frontend use
export const supabase = createClient(
  `https://${projectId}.supabase.co`,
  publicAnonKey
);

// Types for our database
export interface ContactSubmission {
  id?: string;
  name: string;
  company?: string;
  email: string;
  phone?: string;
  service: string;
  message: string;
  created_at?: string;
}

export interface NewsletterSubscription {
  id?: string;
  email: string;
  created_at?: string;
}

export interface PageView {
  id?: string;
  page: string;
  timestamp?: string;
  user_agent?: string;
}
