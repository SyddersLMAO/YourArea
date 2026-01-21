export class AuthError extends Error {
    constructor(message = "Session expired") {
        super(message);
        this.name = "AuthError";
    }
}