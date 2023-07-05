import { UserDetailsResponsePayload } from "./sellerDetails.response.payload";

export interface SigninResponse {
    authenticationToken: string;
    refreshToken: string;
    expiresAt: Date;
    username: string;
    sellerDetails: UserDetailsResponsePayload;
}