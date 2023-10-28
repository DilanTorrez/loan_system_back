import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Branch } from 'src/modules/branch/branch.entity';
import { CreateBranchDto, UpdateBranchDto } from './branch.dto';
import { RequestUserDto } from '../user/user.dto';

@Injectable()
export class BranchService {
  constructor(
    @Inject('BRANCH_REPOSITORY')
    private branchRepository: Repository<Branch>,
  ) {}

  async findAll(request: RequestUserDto): Promise<Branch[]> {
    return this.branchRepository.find({
      where: { account_id: request.account_id },
    });
  }

  create(branch_dto: CreateBranchDto): Promise<CreateBranchDto> {
    return this.branchRepository.save(branch_dto);
  }

  findBranchById(request: any, id: number) {
    return this.branchRepository.findOneBy({
      public_id: id,
      account_id: request.account_id,
    });
  }
  async updateById(id: number, updateData: UpdateBranchDto): Promise<Branch> {
    const branch = await this.branchRepository.findOneBy({ id: id });
    if (!branch) {
      throw new NotFoundException('Branch not found');
    }
    const updatedBranch = Object.assign(branch, updateData);
    return this.branchRepository.save(updatedBranch);
  }

  async updateBranchById(
    id: number,
    updateData: Partial<UpdateBranchDto>,
  ): Promise<Branch> {
    const branch = await this.branchRepository.findOneBy({ id: id });
    if (!branch) {
      throw new NotFoundException('Branch not found');
    }
    const updatedBranch = Object.assign(branch, updateData);
    return this.branchRepository.save(updatedBranch);
  }

  async deleteById(id: number): Promise<void> {
    const branch = await this.branchRepository.findOneBy({ id: id });
    if (!branch) {
      throw new NotFoundException('Branch not found!');
    }
    await this.branchRepository.delete(id);
  }
}
