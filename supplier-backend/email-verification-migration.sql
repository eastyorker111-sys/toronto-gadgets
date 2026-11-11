-- Existing owner-reviewed accounts retain access. All new registrations create a
-- required verification row. No email address is silently marked verified.
CREATE TABLE IF NOT EXISTS supplier_email_verifications (
 account_id TEXT PRIMARY KEY REFERENCES supplier_accounts(id),
 token_hash TEXT NOT NULL DEFAULT '', expires_at INTEGER NOT NULL DEFAULT 0,
 verified_at TEXT NOT NULL DEFAULT ''
);
