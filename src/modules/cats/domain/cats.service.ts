import { CacheInterceptor } from "@nestjs/cache-manager";
import { Injectable, UseInterceptors, HttpException, HttpStatus } from "@nestjs/common";
import { HttpService } from "@nestjs/axios";
import { CatDto } from "../dto/cat.dto";
import { ConfigService } from "@nestjs/config";
import { Observable, map, catchError } from "rxjs";
import { Cat } from "../interface/cat.interface";

@Injectable()
@UseInterceptors(CacheInterceptor)
export class CatsService {
    constructor(
        private readonly httpService: HttpService,
        private readonly configService: ConfigService
    ) {}
    
    getCats(): Observable<CatDto[]> {
        const apiKey = this.configService.get<string>('catApi.apiKey');
        return this.httpService.get<Cat[]>('https://api.thecatapi.com/v1/images/search', {
            params: {
                limit: 20
            },
            headers: {
                'x-api-key': apiKey
            }
        }).pipe(
                map((response) => response.data.map((cat: Cat) => new CatDto(cat))),
                catchError((error) => {
                    throw new HttpException('Error fetching cats', HttpStatus.BAD_GATEWAY);
                })
            );
    }
}

