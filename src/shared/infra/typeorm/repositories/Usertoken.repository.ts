import { AppDataSource } from "..";
import UserToken from "../entities/UserToken";

export const userTokenRepository = AppDataSource.getRepository(UserToken).extend({

    async findByToken(token: string): Promise<UserToken | null> {
        const userToken = await this.findOne({
            where: {
                token,
            },
        });

        return userToken;
    },

    async generate(user_id: string): Promise<UserToken> {
        const userToken = await this.create({
            user_id,
        });

        await this.save(userToken);

        return userToken;
    }
});