import { chromium } from 'playwright';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function generatePDF() {
  console.log('Launching browser...');
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  
  // 1. Spanish CV
  const htmlPathES = path.resolve(__dirname, '../public/cv.html');
  const pdfPathES = path.resolve(__dirname, '../public/CV_Alejandro_Villa.pdf');
  
  console.log(`Loading Spanish CV from: file://${htmlPathES}`);
  await page.goto(`file://${htmlPathES}`, { waitUntil: 'networkidle' });
  
  console.log('Generating Spanish A4 PDF with print styles...');
  await page.pdf({
    path: pdfPathES,
    format: 'A4',
    printBackground: true,
    margin: {
      top: '0px',
      bottom: '0px',
      left: '0px',
      right: '0px'
    }
  });
  console.log(`Spanish PDF successfully generated and saved to: ${pdfPathES}`);

  // 2. English CV
  const htmlPathEN = path.resolve(__dirname, '../public/cv-en.html');
  const pdfPathEN = path.resolve(__dirname, '../public/CV_Alejandro_Villa_EN.pdf');
  
  console.log(`Loading English CV from: file://${htmlPathEN}`);
  await page.goto(`file://${htmlPathEN}`, { waitUntil: 'networkidle' });
  
  console.log('Generating English A4 PDF with print styles...');
  await page.pdf({
    path: pdfPathEN,
    format: 'A4',
    printBackground: true,
    margin: {
      top: '0px',
      bottom: '0px',
      left: '0px',
      right: '0px'
    }
  });
  console.log(`English PDF successfully generated and saved to: ${pdfPathEN}`);
  
  await browser.close();
}

generatePDF().catch(err => {
  console.error('Error generating PDFs:', err);
  process.exit(1);
});
