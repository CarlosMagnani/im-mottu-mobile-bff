import { Injectable, UseInterceptors, HttpException, HttpStatus } from "@nestjs/common";
import { HttpService } from "@nestjs/axios";
import { Observable, map, catchError } from "rxjs";
import { CharacterDto } from "./dto/character.dto";
import { Character } from "./interface/character.interface";
import { CacheInterceptor } from "@nestjs/cache-manager";

@Injectable()
@UseInterceptors(CacheInterceptor)
export class RickAndMortyService {
    constructor(private readonly httpService: HttpService) {}

    getCharacters(): Observable<CharacterDto[]> {
        return this.httpService.get<{results: Character[]}>('https://rickandmortyapi.com/api/character')
            .pipe(
                map((response) => response.data.results.map(character => new CharacterDto(character))),
                catchError((error) => {
                    throw new HttpException('Error fetching characters', HttpStatus.BAD_GATEWAY);
                })
            );
    }
}