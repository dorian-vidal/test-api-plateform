<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20230419163853 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE movies_category DROP CONSTRAINT fk_ee38b6f953f590a4');
        $this->addSql('ALTER TABLE movies_category DROP CONSTRAINT fk_ee38b6f912469de2');
        $this->addSql('DROP TABLE movies_category');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE SCHEMA public');
        $this->addSql('CREATE TABLE movies_category (movies_id INT NOT NULL, category_id INT NOT NULL, PRIMARY KEY(movies_id, category_id))');
        $this->addSql('CREATE INDEX idx_ee38b6f912469de2 ON movies_category (category_id)');
        $this->addSql('CREATE INDEX idx_ee38b6f953f590a4 ON movies_category (movies_id)');
        $this->addSql('ALTER TABLE movies_category ADD CONSTRAINT fk_ee38b6f953f590a4 FOREIGN KEY (movies_id) REFERENCES movies (id) ON DELETE CASCADE NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE movies_category ADD CONSTRAINT fk_ee38b6f912469de2 FOREIGN KEY (category_id) REFERENCES category (id) ON DELETE CASCADE NOT DEFERRABLE INITIALLY IMMEDIATE');
    }
}
