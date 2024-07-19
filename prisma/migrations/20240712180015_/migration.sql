-- CreateTable
CREATE TABLE "page_parent" (
    "page_parent_id" SERIAL NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "page_parent_name" TEXT NOT NULL,
    "hidden" BOOLEAN NOT NULL DEFAULT false,
    "page_parent_index" INTEGER NOT NULL,

    CONSTRAINT "page_parent_pkey" PRIMARY KEY ("page_parent_id")
);

-- CreateTable
CREATE TABLE "app_pages" (
    "page_id" SERIAL NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "page_parent_id" INTEGER,
    "page_name" TEXT NOT NULL,
    "page_link" TEXT NOT NULL,
    "page_disabled" BOOLEAN DEFAULT false,
    "pagination" INTEGER DEFAULT 10,

    CONSTRAINT "app_pages_pkey" PRIMARY KEY ("page_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "page_parent_page_parent_name_key" ON "page_parent"("page_parent_name");

-- CreateIndex
CREATE UNIQUE INDEX "page_parent_page_parent_index_key" ON "page_parent"("page_parent_index");

-- CreateIndex
CREATE UNIQUE INDEX "app_pages_page_name_key" ON "app_pages"("page_name");

-- CreateIndex
CREATE UNIQUE INDEX "app_pages_page_link_key" ON "app_pages"("page_link");

-- AddForeignKey
ALTER TABLE "app_pages" ADD CONSTRAINT "app_pages_page_parent_id_fkey" FOREIGN KEY ("page_parent_id") REFERENCES "page_parent"("page_parent_id") ON DELETE SET NULL ON UPDATE CASCADE;
