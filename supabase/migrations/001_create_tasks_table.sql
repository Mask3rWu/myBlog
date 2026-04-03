-- Create tasks table
CREATE TABLE IF NOT EXISTS tasks (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  start_time TIMESTAMP WITH TIME ZONE NOT NULL,
  end_time TIMESTAMP WITH TIME ZONE,
  parent_id UUID REFERENCES tasks(id) ON DELETE SET NULL,
  is_completed BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create index on parent_id for faster queries
CREATE INDEX idx_tasks_parent_id ON tasks(parent_id);

-- Create index on is_completed for filtering
CREATE INDEX idx_tasks_is_completed ON tasks(is_completed);

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger to automatically update updated_at
CREATE TRIGGER update_tasks_updated_at
  BEFORE UPDATE ON tasks
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Enable Row Level Security
ALTER TABLE tasks ENABLE ROW LEVEL SECURITY;

-- Create policy for public read access (optional, adjust as needed)
CREATE POLICY "Allow public read access" ON tasks
  FOR SELECT USING (true);

-- Create policy for public insert (optional, adjust as needed)
CREATE POLICY "Allow public insert" ON tasks
  FOR INSERT WITH CHECK (true);

-- Create policy for public update (optional, adjust as needed)
CREATE POLICY "Allow public update" ON tasks
  FOR UPDATE USING (true);

-- Create policy for public delete (optional, adjust as needed)
CREATE POLICY "Allow public delete" ON tasks
  FOR DELETE USING (true);
