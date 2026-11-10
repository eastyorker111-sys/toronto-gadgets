CREATE TABLE IF NOT EXISTS supplier_accounts (
 id TEXT PRIMARY KEY, email TEXT NOT NULL UNIQUE, password_hash TEXT NOT NULL,
 recovery_hash TEXT NOT NULL, profile TEXT NOT NULL,
 status TEXT NOT NULL DEFAULT 'Pending review', network_status TEXT NOT NULL DEFAULT 'Not requested',
 revision INTEGER NOT NULL DEFAULT 1, synced_revision INTEGER NOT NULL DEFAULT 0,
 created_at TEXT NOT NULL, updated_at TEXT NOT NULL, review_note TEXT NOT NULL DEFAULT '',
 reviewed_by TEXT NOT NULL DEFAULT '', reviewed_at TEXT NOT NULL DEFAULT '', evidence_checked TEXT NOT NULL DEFAULT ''
);
CREATE TABLE IF NOT EXISTS supplier_sessions (token_hash TEXT PRIMARY KEY, account_id TEXT NOT NULL REFERENCES supplier_accounts(id) ON DELETE CASCADE, expires_at INTEGER NOT NULL);
CREATE INDEX IF NOT EXISTS supplier_session_account ON supplier_sessions(account_id);
CREATE INDEX IF NOT EXISTS supplier_session_expiry ON supplier_sessions(expires_at);
CREATE TABLE IF NOT EXISTS supplier_rate_limits (key TEXT PRIMARY KEY, count INTEGER NOT NULL, expires_at INTEGER NOT NULL);
CREATE INDEX IF NOT EXISTS supplier_rate_expiry ON supplier_rate_limits(expires_at);
CREATE TABLE IF NOT EXISTS supplier_events (id TEXT PRIMARY KEY, account_id TEXT NOT NULL, event TEXT NOT NULL, created_at TEXT NOT NULL, details TEXT NOT NULL);
CREATE TABLE IF NOT EXISTS supplier_uploads (id TEXT PRIMARY KEY, account_id TEXT NOT NULL REFERENCES supplier_accounts(id), csv TEXT NOT NULL, created_at TEXT NOT NULL, share_with_members INTEGER NOT NULL DEFAULT 0, status TEXT NOT NULL DEFAULT 'Pending review', drive_file_id TEXT NOT NULL DEFAULT '', synced INTEGER NOT NULL DEFAULT 0, review_note TEXT NOT NULL DEFAULT '', reminder_state TEXT NOT NULL DEFAULT 'Pending');
CREATE INDEX IF NOT EXISTS supplier_upload_account ON supplier_uploads(account_id,created_at);
CREATE TABLE IF NOT EXISTS supplier_stock (id TEXT PRIMARY KEY, upload_id TEXT NOT NULL REFERENCES supplier_uploads(id), sku TEXT NOT NULL, product TEXT NOT NULL, quantity INTEGER NOT NULL, condition TEXT NOT NULL, city TEXT NOT NULL, country TEXT NOT NULL, unit_cost REAL, currency TEXT NOT NULL);
CREATE INDEX IF NOT EXISTS supplier_stock_upload ON supplier_stock(upload_id);
CREATE TABLE IF NOT EXISTS supplier_market_requests (id TEXT PRIMARY KEY, account_id TEXT NOT NULL REFERENCES supplier_accounts(id), stock_id TEXT NOT NULL REFERENCES supplier_stock(id), quantity INTEGER NOT NULL, notes TEXT NOT NULL, created_at TEXT NOT NULL, synced INTEGER NOT NULL DEFAULT 0);
