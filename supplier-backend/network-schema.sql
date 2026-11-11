-- Additive migration. Preserve existing accounts, inventory, enquiries and Gmail CRM.
CREATE TABLE IF NOT EXISTS supplier_activation_mail (
 id TEXT PRIMARY KEY,account_id TEXT NOT NULL REFERENCES supplier_accounts(id),revision INTEGER NOT NULL,
 state TEXT NOT NULL DEFAULT 'Pending',created_at TEXT NOT NULL,claimed_at TEXT,UNIQUE(account_id,revision)
);
CREATE TABLE IF NOT EXISTS network_posts (
 id TEXT PRIMARY KEY, account_id TEXT NOT NULL REFERENCES supplier_accounts(id),
 title TEXT NOT NULL, created_at TEXT NOT NULL, status TEXT NOT NULL DEFAULT 'Open',
 revision INTEGER NOT NULL DEFAULT 1, synced_revision INTEGER NOT NULL DEFAULT 0,
 submission_key TEXT NOT NULL, UNIQUE(account_id,submission_key)
);
CREATE TABLE IF NOT EXISTS network_items (
 id TEXT PRIMARY KEY,post_id TEXT NOT NULL REFERENCES network_posts(id),item_ref TEXT NOT NULL,
 product TEXT NOT NULL,specifications TEXT NOT NULL,quantity INTEGER NOT NULL CHECK(quantity>0),
 condition TEXT NOT NULL,city TEXT NOT NULL,country TEXT NOT NULL,needed_by TEXT NOT NULL,
 partial_allowed TEXT NOT NULL CHECK(partial_allowed IN ('Yes','No')),UNIQUE(post_id,item_ref)
);
CREATE TABLE IF NOT EXISTS network_offers (
 id TEXT PRIMARY KEY,post_id TEXT NOT NULL REFERENCES network_posts(id),item_id TEXT NOT NULL REFERENCES network_items(id),
 account_id TEXT NOT NULL REFERENCES supplier_accounts(id),quantity INTEGER NOT NULL CHECK(quantity>0),
 unit_price REAL NOT NULL CHECK(unit_price>0),currency TEXT NOT NULL,condition TEXT NOT NULL,
 lead_days INTEGER NOT NULL,product_details TEXT NOT NULL,terms TEXT NOT NULL,
 created_at TEXT NOT NULL,status TEXT NOT NULL DEFAULT 'Submitted',revision INTEGER NOT NULL DEFAULT 1,
 synced_revision INTEGER NOT NULL DEFAULT 0,UNIQUE(item_id,account_id)
);
CREATE TABLE IF NOT EXISTS network_notifications (
 id TEXT PRIMARY KEY,account_id TEXT NOT NULL REFERENCES supplier_accounts(id),post_id TEXT NOT NULL REFERENCES network_posts(id),
 kind TEXT NOT NULL,message TEXT NOT NULL,created_at TEXT NOT NULL,read_at TEXT
);
CREATE INDEX IF NOT EXISTS network_posts_account ON network_posts(account_id,created_at);
CREATE INDEX IF NOT EXISTS network_items_post ON network_items(post_id);
CREATE INDEX IF NOT EXISTS network_offers_item ON network_offers(item_id);
CREATE INDEX IF NOT EXISTS network_notices_account ON network_notifications(account_id,created_at);
CREATE TABLE IF NOT EXISTS network_email_jobs (id TEXT PRIMARY KEY,notice_id TEXT NOT NULL UNIQUE REFERENCES network_notifications(id),account_id TEXT NOT NULL REFERENCES supplier_accounts(id),state TEXT NOT NULL DEFAULT 'Pending',created_at TEXT NOT NULL,claimed_at TEXT);
CREATE TRIGGER IF NOT EXISTS network_notice_email AFTER INSERT ON network_notifications BEGIN
 INSERT INTO network_email_jobs (id,notice_id,account_id,created_at)
 SELECT NEW.id,NEW.id,NEW.account_id,NEW.created_at FROM supplier_accounts
 WHERE id=NEW.account_id AND status='Approved' AND network_status='Approved'
 AND json_extract(profile,'$.networkOptIn')=1 AND json_extract(profile,'$.networkAlertsOptIn')=1;
END;
CREATE TRIGGER IF NOT EXISTS network_offer_insert_guard BEFORE INSERT ON network_offers BEGIN
 SELECT CASE WHEN NOT EXISTS (
 SELECT 1 FROM network_items i JOIN network_posts p ON p.id=i.post_id
 JOIN supplier_accounts owner ON owner.id=p.account_id JOIN supplier_accounts responder ON responder.id=NEW.account_id
 WHERE i.id=NEW.item_id AND p.id=NEW.post_id AND p.account_id<>NEW.account_id AND p.status='Open'
 AND i.needed_by>=date('now') AND NEW.quantity<=i.quantity AND (i.partial_allowed='Yes' OR NEW.quantity=i.quantity)
 AND owner.status='Approved' AND owner.network_status='Approved' AND json_extract(owner.profile,'$.networkOptIn')=1
 AND responder.status='Approved' AND responder.network_status='Approved' AND json_extract(responder.profile,'$.networkOptIn')=1
 ) THEN RAISE(ABORT,'Requirement unavailable or invalid quantity') END;
END;
CREATE TRIGGER IF NOT EXISTS network_offer_update_guard BEFORE UPDATE OF quantity,unit_price,product_details ON network_offers BEGIN
 SELECT CASE WHEN NOT EXISTS (
 SELECT 1 FROM network_items i JOIN network_posts p ON p.id=i.post_id
 JOIN supplier_accounts owner ON owner.id=p.account_id JOIN supplier_accounts responder ON responder.id=NEW.account_id
 WHERE i.id=NEW.item_id AND p.id=NEW.post_id AND p.account_id<>NEW.account_id AND p.status='Open'
 AND i.needed_by>=date('now') AND NEW.quantity<=i.quantity AND (i.partial_allowed='Yes' OR NEW.quantity=i.quantity)
 AND owner.status='Approved' AND owner.network_status='Approved' AND json_extract(owner.profile,'$.networkOptIn')=1
 AND responder.status='Approved' AND responder.network_status='Approved' AND json_extract(responder.profile,'$.networkOptIn')=1
 ) THEN RAISE(ABORT,'Requirement unavailable or invalid quantity') END;
END;
