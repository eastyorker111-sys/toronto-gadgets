ALTER TABLE supplier_stock ADD COLUMN minimum_quantity INTEGER NOT NULL DEFAULT 1 CHECK(minimum_quantity>=1);
