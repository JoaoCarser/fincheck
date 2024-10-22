import { type Prisma } from "@prisma/client";
import { PrismaService } from "../prisma.service";
import { Injectable } from "@nestjs/common";


@Injectable()
export class bankAccountsRepository {
    constructor(private readonly prismService: PrismaService){}

     create(createDto: Prisma.BankAccountCreateArgs){
        return  this.prismService.bankAccount.create(createDto);
    }

    // async findByName(name: Prisma.BankAccountFindFirstArgs){
    //     return await this.prismService.bankAccount.findByName({name: name});
    // }
}