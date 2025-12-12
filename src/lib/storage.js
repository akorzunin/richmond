import fs from 'fs';
import path from 'path';
import { nanoid } from 'nanoid';

const uploadsDir = path.join(process.cwd(), 'uploads');
const catsDir = path.join(process.cwd(), 'public', 'cats');

[uploadsDir, catsDir].forEach(dir => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
});

export const storage = {
  saveTempFile(file) {
    const tempId = nanoid(10);
    const tempPath = path.join(uploadsDir, tempId);
    
    fs.writeFileSync(tempPath, file);
    return { id: tempId, path: tempPath };
  },
  
  moveToStorage(tempId, catId, filename) {
    const tempPath = path.join(uploadsDir, tempId);
    
    const catDir = path.join(catsDir, catId.toString());
    if (!fs.existsSync(catDir)) {
      fs.mkdirSync(catDir, { recursive: true });
    }
    
    const ext = path.extname(filename);
    const uniqueName = `${nanoid(8)}${ext}`;
    const finalPath = path.join(catDir, uniqueName);
    
    fs.renameSync(tempPath, finalPath);
    
    return `/cats/${catId}/${uniqueName}`;
  },
  
  deleteFile(filePath) {
    const fullPath = path.join(process.cwd(), 'public', filePath);
    if (fs.existsSync(fullPath)) {
      fs.unlinkSync(fullPath);
    }
  },
  
  getCatPhotos(catId) {
    const catDir = path.join(catsDir, catId.toString());
    if (!fs.existsSync(catDir)) return [];
    
    const files = fs.readdirSync(catDir)
      .filter(file => /\.(jpg|jpeg|png|gif|webp)$/i.test(file))
      .map(file => `/cats/${catId}/${file}`);
    
    return files;
  },
  
  cleanupTempFiles() {
    const files = fs.readdirSync(uploadsDir);
    const now = Date.now();
    
    files.forEach(file => {
      const filePath = path.join(uploadsDir, file);
      const stat = fs.statSync(filePath);
      
      if (now - stat.mtimeMs > 3600000) {
        fs.unlinkSync(filePath);
      }
    });
  }
};