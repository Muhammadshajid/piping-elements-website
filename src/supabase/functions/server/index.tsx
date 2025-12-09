import { Hono } from 'npm:hono';
import { cors } from 'npm:hono/cors';
import { logger } from 'npm:hono/logger';
import * as kv from './kv_store.tsx';

const app = new Hono();

// Middleware
app.use('*', cors({
  origin: '*',
  allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowHeaders: ['Content-Type', 'Authorization', 'X-Session-Token'],
}));

app.use('*', logger(console.log));

// Admin password (in production, use environment variable)
const ADMIN_PASSWORD = Deno.env.get('ADMIN_PASSWORD') || 'PipingElements2024!';
const SESSION_TOKENS = new Map<string, { created: number }>();

// Helper: Generate session token
function generateToken(): string {
  return crypto.randomUUID();
}

// Helper: Verify session token
function verifySession(token: string | null): boolean {
  if (!token) return false;
  
  const session = SESSION_TOKENS.get(token);
  if (!session) return false;
  
  // Token expires after 24 hours
  const twentyFourHours = 24 * 60 * 60 * 1000;
  if (Date.now() - session.created > twentyFourHours) {
    SESSION_TOKENS.delete(token);
    return false;
  }
  
  return true;
}

// Middleware: Require authentication
function requireAuth(c: any, next: any) {
  const token = c.req.header('X-Session-Token');
  
  if (!verifySession(token)) {
    return c.json({ error: 'Unauthorized - Invalid or expired session' }, 401);
  }
  
  return next();
}

// ========================================
// PUBLIC ROUTES (No Authentication)
// ========================================

// Health check
app.get('/make-server-5d29cd66/health', (c) => {
  return c.json({ status: 'healthy', timestamp: new Date().toISOString() });
});

// Submit contact form
app.post('/make-server-5d29cd66/contact', async (c) => {
  try {
    const body = await c.req.json();
    const { name, company, email, phone, service, message } = body;

    // Validation
    if (!name || !email || !service || !message) {
      return c.json({ error: 'Missing required fields' }, 400);
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return c.json({ error: 'Invalid email address' }, 400);
    }

    // Store in KV database
    const id = crypto.randomUUID();
    const submission = {
      id,
      name,
      company: company || '',
      email,
      phone: phone || '',
      service,
      message,
      created_at: new Date().toISOString(),
    };

    await kv.set(`contact:${id}`, submission);

    console.log(`✅ Contact form submitted: ${name} (${email})`);

    return c.json({
      success: true,
      message: 'Contact form submitted successfully',
      id,
    });
  } catch (error) {
    console.error('❌ Error submitting contact form:', error);
    return c.json({ error: 'Failed to submit contact form' }, 500);
  }
});

// Subscribe to newsletter
app.post('/make-server-5d29cd66/newsletter', async (c) => {
  try {
    const body = await c.req.json();
    const { email } = body;

    // Validation
    if (!email) {
      return c.json({ error: 'Email is required' }, 400);
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return c.json({ error: 'Invalid email address' }, 400);
    }

    // Check if already subscribed
    const existing = await kv.getByPrefix('newsletter:');
    const alreadySubscribed = existing.some((sub: any) => sub.email === email);

    if (alreadySubscribed) {
      return c.json({
        success: true,
        message: 'Already subscribed',
      });
    }

    // Store in KV database
    const id = crypto.randomUUID();
    const subscription = {
      id,
      email,
      created_at: new Date().toISOString(),
    };

    await kv.set(`newsletter:${id}`, subscription);

    console.log(`✅ Newsletter subscription: ${email}`);

    return c.json({
      success: true,
      message: 'Successfully subscribed to newsletter',
      id,
    });
  } catch (error) {
    console.error('❌ Error subscribing to newsletter:', error);
    return c.json({ error: 'Failed to subscribe to newsletter' }, 500);
  }
});

// Track page view
app.post('/make-server-5d29cd66/analytics', async (c) => {
  try {
    const body = await c.req.json();
    const { page, user_agent } = body;

    if (!page) {
      return c.json({ error: 'Page is required' }, 400);
    }

    const id = crypto.randomUUID();
    const pageView = {
      id,
      page,
      user_agent: user_agent || 'Unknown',
      timestamp: new Date().toISOString(),
    };

    await kv.set(`analytics:${id}`, pageView);

    return c.json({ success: true });
  } catch (error) {
    console.error('❌ Error tracking page view:', error);
    return c.json({ error: 'Failed to track page view' }, 500);
  }
});

// ========================================
// ADMIN AUTHENTICATION ROUTES
// ========================================

// Admin login
app.post('/make-server-5d29cd66/admin/login', async (c) => {
  try {
    const body = await c.req.json();
    const { password } = body;

    if (password === ADMIN_PASSWORD) {
      const token = generateToken();
      SESSION_TOKENS.set(token, { created: Date.now() });

      console.log(`✅ Admin logged in successfully`);

      return c.json({
        success: true,
        token,
        message: 'Login successful',
      });
    } else {
      console.log(`❌ Failed admin login attempt`);
      return c.json({ error: 'Invalid password' }, 401);
    }
  } catch (error) {
    console.error('❌ Error during admin login:', error);
    return c.json({ error: 'Login failed' }, 500);
  }
});

// Verify admin session
app.get('/make-server-5d29cd66/admin/verify', (c) => {
  const token = c.req.header('X-Session-Token');
  const valid = verifySession(token);
  
  return c.json({ valid });
});

// ========================================
// PROTECTED ADMIN ROUTES (Require Auth)
// ========================================

// Get all contact submissions
app.get('/make-server-5d29cd66/contact', requireAuth, async (c) => {
  try {
    const submissions = await kv.getByPrefix('contact:');
    
    // Sort by created_at descending (newest first)
    submissions.sort((a: any, b: any) => {
      return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
    });

    return c.json(submissions);
  } catch (error) {
    console.error('❌ Error fetching contact submissions:', error);
    return c.json({ error: 'Failed to fetch contact submissions' }, 500);
  }
});

// Get all newsletter subscriptions
app.get('/make-server-5d29cd66/newsletter', requireAuth, async (c) => {
  try {
    const subscriptions = await kv.getByPrefix('newsletter:');
    
    // Sort by created_at descending (newest first)
    subscriptions.sort((a: any, b: any) => {
      return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
    });

    return c.json(subscriptions);
  } catch (error) {
    console.error('❌ Error fetching newsletter subscriptions:', error);
    return c.json({ error: 'Failed to fetch newsletter subscriptions' }, 500);
  }
});

// Get analytics data
app.get('/make-server-5d29cd66/analytics', requireAuth, async (c) => {
  try {
    const pageViews = await kv.getByPrefix('analytics:');
    
    // Calculate stats
    const totalViews = pageViews.length;
    const pageStats: { [key: string]: number } = {};
    
    pageViews.forEach((view: any) => {
      const page = view.page || 'unknown';
      pageStats[page] = (pageStats[page] || 0) + 1;
    });

    // Get recent views (last 50)
    const recentViews = pageViews
      .sort((a: any, b: any) => {
        return new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime();
      })
      .slice(0, 50);

    return c.json({
      totalViews,
      pageStats,
      recentViews,
    });
  } catch (error) {
    console.error('❌ Error fetching analytics:', error);
    return c.json({ error: 'Failed to fetch analytics' }, 500);
  }
});

// Delete contact submission (admin only)
app.delete('/make-server-5d29cd66/contact/:id', requireAuth, async (c) => {
  try {
    const id = c.req.param('id');
    await kv.del(`contact:${id}`);
    
    console.log(`✅ Deleted contact submission: ${id}`);
    
    return c.json({ success: true });
  } catch (error) {
    console.error('❌ Error deleting contact submission:', error);
    return c.json({ error: 'Failed to delete submission' }, 500);
  }
});

// Delete newsletter subscription (admin only)
app.delete('/make-server-5d29cd66/newsletter/:id', requireAuth, async (c) => {
  try {
    const id = c.req.param('id');
    await kv.del(`newsletter:${id}`);
    
    console.log(`✅ Deleted newsletter subscription: ${id}`);
    
    return c.json({ success: true });
  } catch (error) {
    console.error('❌ Error deleting subscription:', error);
    return c.json({ error: 'Failed to delete subscription' }, 500);
  }
});

// Start server
Deno.serve(app.fetch);

console.log('🚀 Piping Elements Backend Server Started');
console.log('🔒 Secure endpoints active');
console.log(`🔑 Admin password: ${ADMIN_PASSWORD}`);
