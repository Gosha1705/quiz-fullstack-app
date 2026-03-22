import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Advisor } from './entities/advisor.entity';

@Injectable()
export class AdvisorsService {
  constructor(
    @InjectRepository(Advisor)
    private advisorsRepository: Repository<Advisor>,
  ) {}

  findAll() {
    return this.advisorsRepository.find();
  }
  
  findOne(id: number) {
    return this.advisorsRepository.findOneBy({ id });
  }
}