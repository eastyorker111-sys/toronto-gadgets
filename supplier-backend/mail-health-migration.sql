ALTER TABLE supplier_activation_mail ADD COLUMN claimed_at TEXT;
ALTER TABLE network_email_jobs ADD COLUMN claimed_at TEXT;
ALTER TABLE supplier_uploads ADD COLUMN reminder_claimed_at TEXT;
