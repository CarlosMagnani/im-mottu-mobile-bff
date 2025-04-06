import { Cat } from "../interface/cat.interface";

export class CatDto {
    readonly id: string;
    readonly url: string;
    constructor(cat: Cat) {
        this.id = cat.id;
        this.url = cat.url;
    }
}


