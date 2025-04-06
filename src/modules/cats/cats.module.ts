import { Module } from "@nestjs/common";
import { CatsService } from "./domain/cats.service";
import { HttpModule } from "@nestjs/axios";
import { CacheModule } from "@nestjs/cache-manager";

@Module({
    imports: [
        HttpModule,
        CacheModule.register({
            ttl: 60,
            max: 100,
        }),
    ],
    providers: [CatsService],
    exports: [CatsService],
})
export class CatsModule {}
