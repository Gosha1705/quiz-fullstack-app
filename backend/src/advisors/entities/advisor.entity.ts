import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';

@Entity('advisors') 
export class Advisor {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('text', { array: true })
  specializations: string[];

  @Column({ length: 255 })
  name: string;

  @Column({ name: 'min_asset_threshold' })
  minAssetThreshold: number;

  @Column('text', { nullable: true })
  bio: string;

  @Column({ name: 'avatar_url', length: 255, nullable: true })
  avatarUrl: string;

  @Column({ length: 100 })
  city: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;
}