import { Controller, Get } from "@nestjs/common";
import { PairsService } from "./pairs.service";
import { PairDto } from "./dto/pairs.dto";
import { Observable } from "rxjs";
@Controller('v1/pairs')
export class PairsController {
    constructor(private readonly pairsService: PairsService) {}

    @Get()
    getPairs(): Observable<PairDto[]> {
        return this.pairsService.getPairs();
    }
}
