/*
  # Voice Preferences Schema

  1. New Tables
    - `voice_preferences`
      - `id` (uuid, primary key) - Unique identifier for the record
      - `user_id` (uuid, foreign key) - References auth.users
      - `voice_id` (text) - The selected voice identifier (guardian_pro, sofia_warm, etc.)
      - `created_at` (timestamptz) - When the preference was first set
      - `updated_at` (timestamptz) - When the preference was last updated

  2. Security
    - Enable RLS on `voice_preferences` table
    - Add policy for authenticated users to read their own preferences
    - Add policy for authenticated users to insert their own preferences
    - Add policy for authenticated users to update their own preferences

  3. Notes
    - Users can only have one voice preference record
    - Voice preferences persist across sessions
    - New calls will use the selected voice immediately after saving
*/

CREATE TABLE IF NOT EXISTS voice_preferences (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  voice_id text NOT NULL DEFAULT 'guardian_pro',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(user_id)
);

ALTER TABLE voice_preferences ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read own voice preferences"
  ON voice_preferences
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own voice preferences"
  ON voice_preferences
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own voice preferences"
  ON voice_preferences
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE OR REPLACE FUNCTION update_voice_preferences_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER voice_preferences_updated_at
  BEFORE UPDATE ON voice_preferences
  FOR EACH ROW
  EXECUTE FUNCTION update_voice_preferences_updated_at();
