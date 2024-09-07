import multer from 'multer';
export const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        // where we'll storage the image
        cb(null, './public/images/');
    }, 
    filename: (req, file, cb) => {
        //rename the file to include
        cb(null, `${Date.now()}.${file.originalname.split('.').pop()}`);
    }
});