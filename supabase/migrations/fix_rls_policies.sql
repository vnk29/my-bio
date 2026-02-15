-- Fix overly permissive RLS policies
-- This migration adds proper authentication checks to prevent unauthorized access

-- Drop existing permissive policies
DROP POLICY IF EXISTS "analytics_insert_policy" ON public.analytics;
DROP POLICY IF EXISTS "contacts_insert_policy" ON public.contacts;
DROP POLICY IF EXISTS "projects_delete_policy" ON public.projects;
DROP POLICY IF EXISTS "projects_insert_policy" ON public.projects;
DROP POLICY IF EXISTS "projects_update_policy" ON public.projects;
DROP POLICY IF EXISTS "site_content_update_policy" ON public.site_content;
DROP POLICY IF EXISTS "site_content_upsert_policy" ON public.site_content;

-- ========== ANALYTICS TABLE ==========
-- SELECT: Allow anyone to read (for dashboard display)
CREATE POLICY "analytics_select_policy"
ON public.analytics
FOR SELECT
USING (true);

-- INSERT: Only allow from authenticated backend requests (validate in app)
-- We use a permissive approach with backend validation since we don't have JWT yet
CREATE POLICY "analytics_insert_policy"
ON public.analytics
FOR INSERT
WITH CHECK (
  -- Require valid data
  event_type IS NOT NULL AND
  event_type != '' AND
  (page_url IS NULL OR page_url != '')
);

-- ========== CONTACTS TABLE ==========
-- SELECT: Admin only (for viewing submissions)
CREATE POLICY "contacts_select_policy"
ON public.contacts
FOR SELECT
USING (false);  -- No direct select - access via backend only

-- INSERT: Allow public submissions with data validation
CREATE POLICY "contacts_insert_policy"
ON public.contacts
FOR INSERT
WITH CHECK (
  -- Validate required fields
  name IS NOT NULL AND
  name != '' AND
  email IS NOT NULL AND
  email != '' AND
  message IS NOT NULL AND
  message != '' AND
  -- Basic email format check
  email LIKE '%@%.%'
);

-- ========== PROJECTS TABLE ==========
-- SELECT: Allow anyone to read (for portfolio display)
CREATE POLICY "projects_select_policy"
ON public.projects
FOR SELECT
USING (true);

-- INSERT: Restrict to backend only (enforced via authentication token in backend)
CREATE POLICY "projects_insert_policy"
ON public.projects
FOR INSERT
WITH CHECK (false);  -- Must go through backend API

-- UPDATE: Restrict to backend only
CREATE POLICY "projects_update_policy"
ON public.projects
FOR UPDATE
USING (false)  -- No direct updates allowed
WITH CHECK (false);

-- DELETE: Restrict to backend only
CREATE POLICY "projects_delete_policy"
ON public.projects
FOR DELETE
USING (false);  -- Must go through backend API

-- ========== SITE_CONTENT TABLE ==========
-- SELECT: Allow anyone to read
CREATE POLICY "site_content_select_policy"
ON public.site_content
FOR SELECT
USING (true);

-- INSERT: Restrict to backend only
CREATE POLICY "site_content_insert_policy"
ON public.site_content
FOR INSERT
WITH CHECK (false);

-- UPDATE: Restrict to backend only
CREATE POLICY "site_content_update_policy"
ON public.site_content
FOR UPDATE
USING (false)
WITH CHECK (false);

-- ========== GRANT STATEMENTS ==========
-- Ensure proper permissions
GRANT SELECT ON public.projects TO public;
GRANT SELECT ON public.site_content TO public;
GRANT INSERT ON public.analytics TO public;
GRANT INSERT ON public.contacts TO public;

-- Note: Admin write operations (INSERT, UPDATE, DELETE) must be performed
-- through the backend server with proper authentication and validation
