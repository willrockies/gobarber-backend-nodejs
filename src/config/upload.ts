import path from "path";
import multer from "multer";
import crypto from "crypto";
const tmpFolder = path.resolve(__dirname, '..', '..', 'tmp');
export default {
    directory: tmpFolder,
    storage: multer.diskStorage({
        destination: tmpFolder,
        filename: (req, file, callback) => {
            const filhash = crypto.randomBytes(10).toString('hex');
            const filename = `${filhash}-${file.originalname}`;
            return callback(null, filename);
        }
    }),
}