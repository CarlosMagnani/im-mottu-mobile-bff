import { CatDto } from "../../cats/dto/cat.dto";
import { CharacterDto } from "../../rickandmorty/dto/character.dto";

export class PairDto {
    readonly character: CharacterDto;
    readonly cat: {
        id: string;
        image: string;
    };

    constructor(character: CharacterDto, cat: CatDto) {
        this.character = character;
        this.cat = {
            id: cat.id,
            image: cat.url
        };
    }
}
