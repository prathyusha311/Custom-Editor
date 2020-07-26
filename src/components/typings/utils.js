

export const content = `
/**
 * User object
 */
declare class User {
    /**
     * user name
     */
    name: string,
    /**
     * user id
     */
    id: string,
    /**
     * user email
     */
    email: string,
    
},
/**
 * context object
 */
declare class Context {
    /**
     * client Id
     */
    clientId: string,
    /**
     * client Name
     */
    clientName: string,
    /**
     * request
     */
    request: object, 
},
declare function callback(event:string): void
`