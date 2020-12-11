TRUNCATE notes, folders RESTART IDENTITY CASCADE;

INSERT INTO folders (name)
VALUES
  ('Information Technology'),
  ('Psychology'),
  ('Mathematics'),
  ('Science');

INSERT INTO notes (name, content, folder_id)
VALUES
  ('Note 1', 'Subject is hard but interesting', 1),
  ('Note 1', 'Subject is hard but interesting', 2),
  ('Note 1', 'Subject is hard but interesting', 3),
  ('Note 1', 'Subject is hard but interesting', 4),
  ('Note 2', 'Subject is hard but interesting', 2),
  ('Note 2', 'Subject is hard but interesting', 3),
  ('Note 2', 'Subject is hard but interesting', 4),
  ('Note 3', 'Subject is hard but interesting', 3),
  ('Note 3', 'Subject is hard but interesting', 4),
  ('Note 4', 'Subject is hard but interesting', 4);