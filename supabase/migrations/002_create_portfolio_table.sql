-- Create portfolio_projects table
CREATE TABLE IF NOT EXISTS portfolio_projects (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  summary TEXT,
  content TEXT,
  responsibility TEXT,
  role TEXT NOT NULL,
  start_date DATE NOT NULL,
  end_date DATE NOT NULL,
  github_url TEXT,
  project_type TEXT,
  tech_tags JSONB DEFAULT '[]'::jsonb,
  images JSONB DEFAULT '[]'::jsonb,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create index on start_date for ordering
CREATE INDEX idx_portfolio_start_date ON portfolio_projects(start_date DESC);

-- Reuse existing updated_at trigger function
CREATE TRIGGER update_portfolio_updated_at
  BEFORE UPDATE ON portfolio_projects
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Enable RLS
ALTER TABLE portfolio_projects ENABLE ROW LEVEL SECURITY;

-- Public access policies
CREATE POLICY "Allow public read" ON portfolio_projects
  FOR SELECT USING (true);

CREATE POLICY "Allow public insert" ON portfolio_projects
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow public update" ON portfolio_projects
  FOR UPDATE USING (true);

CREATE POLICY "Allow public delete" ON portfolio_projects
  FOR DELETE USING (true);
