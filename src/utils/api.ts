import { projectId, publicAnonKey } from './supabase/info';
import type { ContactSubmission, NewsletterSubscription } from './supabase/client';

const API_BASE_URL = `https://${projectId}.supabase.co/functions/v1/make-server-5d29cd66`;

// Helper function for secure API calls
async function secureApiCall<T>(
  endpoint: string,
  method: string = 'GET',
  data?: any,
  requireAuth: boolean = false
): Promise<{ success: boolean; data?: T; error?: string }> {
  try {
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${publicAnonKey}`,
    };

    // Add session token for authenticated requests
    if (requireAuth) {
      const sessionToken = localStorage.getItem('admin_session_token');
      if (sessionToken) {
        headers['X-Session-Token'] = sessionToken;
      }
    }

    const options: RequestInit = {
      method,
      headers,
      ...(data && { body: JSON.stringify(data) }),
    };

    const response = await fetch(`${API_BASE_URL}${endpoint}`, options);
    
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(errorText || `HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    return { success: true, data: result };
  } catch (error) {
    // Only log errors for critical endpoints (not analytics during development)
    if (!endpoint.includes('/analytics')) {
      console.error(`API Error [${endpoint}]:`, error);
    }
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error occurred',
    };
  }
}

// Contact Form API
export async function submitContactForm(data: ContactSubmission) {
  return secureApiCall<{ id: string }>('/contact', 'POST', data);
}

export async function getAllContactSubmissions() {
  return secureApiCall<ContactSubmission[]>('/contact', 'GET', null, true);
}

// Newsletter API
export async function subscribeToNewsletter(email: string) {
  return secureApiCall<{ id: string }>('/newsletter', 'POST', { email });
}

export async function getAllNewsletterSubscriptions() {
  return secureApiCall<NewsletterSubscription[]>('/newsletter', 'GET', null, true);
}

// Analytics API
export async function trackPageView(page: string) {
  // Silently fail if backend is not available (before deployment)
  try {
    const userAgent = navigator.userAgent;
    const response = await secureApiCall('/analytics', 'POST', { page, user_agent: userAgent });
    
    // Don't log errors to avoid console spam during development
    if (!response.success) {
      // Silently ignore - backend might not be deployed yet
      return { success: false, error: 'Backend not available' };
    }
    
    return response;
  } catch (error) {
    // Silently fail - this is non-critical functionality
    return { success: false, error: 'Analytics unavailable' };
  }
}

export async function getPageAnalytics() {
  return secureApiCall<any>('/analytics', 'GET', null, true);
}

// Admin Authentication API
export async function adminLogin(password: string) {
  const response = await secureApiCall<{ token: string; success: boolean }>(
    '/admin/login',
    'POST',
    { password }
  );
  
  if (response.success && response.data?.token) {
    localStorage.setItem('admin_session_token', response.data.token);
    localStorage.setItem('admin_logged_in', 'true');
  }
  
  return response;
}

export async function adminLogout() {
  localStorage.removeItem('admin_session_token');
  localStorage.removeItem('admin_logged_in');
  return { success: true };
}

export function isAdminLoggedIn(): boolean {
  return localStorage.getItem('admin_logged_in') === 'true';
}

export async function verifyAdminSession() {
  return secureApiCall<{ valid: boolean }>('/admin/verify', 'GET', null, true);
}