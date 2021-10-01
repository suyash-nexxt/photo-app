-- CreateTable
CREATE TABLE "Photo" (
    "id" SERIAL NOT NULL,
    "caption" TEXT,
    "url" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "galleryId" INTEGER NOT NULL,
    "cloudinaryPublicId" TEXT NOT NULL,
    "width" INTEGER NOT NULL,
    "height" INTEGER NOT NULL,

    PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Photo" ADD FOREIGN KEY ("galleryId") REFERENCES "Gallery"("id") ON DELETE CASCADE ON UPDATE CASCADE;
