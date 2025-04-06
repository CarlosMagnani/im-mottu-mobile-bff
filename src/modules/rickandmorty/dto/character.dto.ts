import { Character } from "../interface/character.interface";

export class CharacterDto {
    readonly name: string;
    readonly image: string;
    readonly species: string;

    constructor(character: Character) {
        this.name = character.name;
        this.image = character.image;
        this.species = character.species;
    }
} 