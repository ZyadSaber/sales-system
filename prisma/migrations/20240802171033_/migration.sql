/*
  Warnings:

  - Made the column `page_parent_index` on table `page_parent` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "page_parent" ALTER COLUMN "page_parent_index" SET NOT NULL;
