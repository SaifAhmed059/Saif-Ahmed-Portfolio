import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Project {
  @PrimaryGeneratedColumn() id: number;
  @Column({ type: 'varchar' }) title: string;
  @Column({ type: 'text' }) summary: string;
  @Column('simple-array') stack: string[];
  @Column({ type: 'varchar', nullable: true }) liveUrl: string | null;
  @Column({ type: 'varchar', nullable: true }) repoUrl: string | null;
  @Column({ type: 'int', default: 0 }) position: number;
}

@Entity()
export class Message {
  @PrimaryGeneratedColumn() id: number;
  @Column({ type: 'varchar' }) name: string;
  @Column({ type: 'varchar' }) email: string;
  @Column({ type: 'text' }) body: string;
  @CreateDateColumn() createdAt: Date;
}
