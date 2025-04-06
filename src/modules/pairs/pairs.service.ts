import { Injectable } from "@nestjs/common";
import { CatsService } from "../cats/domain/cats.service";
import { PairDto } from "./dto/pairs.dto";
import { forkJoin, map, Observable } from "rxjs";
import { RickAndMortyService } from "../rickandmorty/rick-and-morty.service";
@Injectable()
export class PairsService {
    constructor(private readonly catsService: CatsService, private readonly rickAndMortyService: RickAndMortyService) {}

    getPairs(): Observable<PairDto[]> {
        return forkJoin({
            characters: this.rickAndMortyService.getCharacters(),
            cats: this.catsService.getCats()
        }).pipe(
            map(({ characters, cats }) => {
                const pairsCount = Math.min(characters.length, cats.length)
                const pairs: PairDto[] = []
                for (let i = 0; i < pairsCount; i++) {
                    pairs.push(new PairDto(characters[i], cats[i]))
                }
                return pairs
            })
        );
    }
}

