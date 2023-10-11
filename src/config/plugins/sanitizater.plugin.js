import sanitizater from "perfect-express-sanitizer";

export const sanitizaterClean = () => {
    return sanitizater.clean({
        xss: true,
        noSql: true,
        sql: false,
    })
}



