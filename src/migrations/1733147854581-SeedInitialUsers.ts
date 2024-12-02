import { MigrationInterface, QueryRunner } from 'typeorm';
import * as fs from 'fs';
import * as path from 'path';
export class SeedInitialUsers1733147854581 implements MigrationInterface {
  private maleNames: string[] = [];
  private femaleNames: string[] = [];
  private lastNames: string[] = [];

  private async readCSV(filePath: string): Promise<string[]> {
    const fullPath = path.join(__dirname, filePath);
    const fileContent = await fs.promises.readFile(fullPath, 'utf-8');
    return fileContent
      .split('\n')
      .map((line) => line.trim())
      .filter(Boolean);
  }
  public async up(queryRunner: QueryRunner): Promise<void> {
    this.maleNames = await this.readCSV('male.csv');
    this.femaleNames = await this.readCSV('female.csv');
    this.lastNames = await this.readCSV('last_name.csv');

    for (let i = 0; i < 1000; i++) {
      const gender = Math.random() > 0.5 ? 'male' : 'female';
      let firstName: string;
      if (gender === 'male') {
        firstName =
          this.maleNames[Math.floor(Math.random() * this.maleNames.length)];
      } else {
        firstName =
          this.femaleNames[Math.floor(Math.random() * this.femaleNames.length)];
      }
      const lastName =
        this.lastNames[Math.floor(Math.random() * this.lastNames.length)];
      const age = Math.floor(Math.random() * 50) + 1;
      const hasProblems = Math.random() > 0.8; // 20% true

      await queryRunner.query(
        `INSERT INTO users (first_name, last_name, age, gender, has_problems) VALUES ($1, $2, $3, $4, $5)`,
        [firstName, lastName, age, gender, hasProblems],
      );
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DELETE FROM users WHERE true');
  }
}
